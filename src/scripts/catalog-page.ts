// 品类列表页的交互脚本：分面筛选、排序、分页与已选标签，全部在客户端完成。
// 分面计数（facetCounts）已在 lib/catalog.ts 里实现并测试过——本文件只管把结果画出来。
//
// renderFacetsMarkup / renderChipsMarkup 同时供两处调用：
// 1) FacetRail.astro / ActiveChips.astro 在服务端用它们生成首屏 HTML；
// 2) initCatalogPage 在客户端用同一份实现重新渲染。
// 这样首屏与交互后的标记永远出自同一处逻辑，不会出现两份实现互相drift的问题。
import {
  filterItems, facetCounts, sortItems, facetValue, searchItems,
  FACETS, SIZE_ORDER, PRICE_ORDER, SORT_KEYS,
  type CatalogItem, type FacetKey, type Selection, type SortKey
} from '../lib/catalog';
import { COLOR_SWATCH, type ColorFamily } from '../lib/art/palettes';
import { placeholderColor } from '../lib/art/render';
import { usd, dimensionsShort, editionLabel } from '../lib/format';
import { paintGrid } from './paint-grid';

// 与 Catalog.astro 共享：服务端首屏只铺这么多张卡片，客户端分页也是这个数。
export const PAGE_SIZE = 24;

function escapeAttr(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeText(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

/** 某个分面维度下要展示哪些取值：size/price 用固定档位（含 0 件的档位），其余按字母序 */
function valuesForFacet(key: FacetKey, items: CatalogItem[]): string[] {
  if (key === 'size') return SIZE_ORDER.slice();
  if (key === 'price') return PRICE_ORDER.slice();
  const set = new Set(items.map((item) => facetValue(item, key)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

function activeCount(sel: Selection): number {
  return Object.values(sel).reduce((n, arr) => n + (arr?.length ?? 0), 0);
}

/**
 * 从 location.search 里解析出初始筛选：供首页的合集卡片/价格入口把筛选条件
 * 通过查询参数带进列表页（如 /paintings?color=Blue）。
 * 未知维度（不是 FacetKey 的键）、或该维度里没有任何作品命中的取值，都直接丢弃，
 * 而不是让页面因为一个打错的 key/value 渲染成空结果——同一个键可以重复出现
 * 多次来表示同一维度的多选（如 ?size=A&size=B），也可以同时带多个不同的键。
 */
export function parseSelectionFromSearch(search: string, items: CatalogItem[]): Selection {
  const validKeys = new Set(FACETS.map((f) => f.key));
  const params = new URLSearchParams(search);
  const selection: Selection = {};

  for (const key of new Set(params.keys())) {
    if (!validKeys.has(key as FacetKey)) continue;
    const facetKey = key as FacetKey;
    const known = new Set(items.map((item) => facetValue(item, facetKey)));
    const values = [...new Set(params.getAll(key))].filter((v) => known.has(v));
    if (values.length) selection[facetKey] = values;
  }

  return selection;
}

/** 从 location.search 里解析出排序；缺省或非法值一律退回 curated */
export function parseSortFromSearch(search: string): SortKey {
  const value = new URLSearchParams(search).get('sort');
  return SORT_KEYS.includes(value as SortKey) ? (value as SortKey) : 'curated';
}

/**
 * 从 location.search 里解析出搜索关键词。
 * 顶部搜索框在非列表页是一个普通的 GET 表单（action="/paintings/"），所以从任何
 * 页面按下回车都会带着 ?q= 落到绘画列表页——这条路径连 JS 都不需要。
 */
export function parseQueryFromSearch(search: string): string {
  return (new URLSearchParams(search).get('q') ?? '').trim();
}

/**
 * parseSelectionFromSearch / parseSortFromSearch 的反向：把当前筛选与排序写回查询串。
 * 编码方式与首页 index.astro 的 categoryHref 完全一致（同一维度多选就重复出现同一个键），
 * 所以首页带过来的链接、用户手动筛出来的地址、以及这里写回去的地址是同一种形状。
 * curated 是默认排序，不写进查询串，免得未筛选的页面也挂一串参数。
 */
export function searchFromState(selection: Selection, sort: SortKey, query = ''): string {
  const params = new URLSearchParams();
  for (const f of FACETS) {
    for (const v of selection[f.key] ?? []) params.append(f.key, v);
  }
  if (sort !== 'curated') params.append('sort', sort);
  if (query.trim()) params.append('q', query.trim());
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/** 渲染八组分面（含互斥自身维度的计数），供首屏与每次交互复用 */
export function renderFacetsMarkup(items: CatalogItem[], sel: Selection): string {
  return FACETS.map((f) => {
    const counts = facetCounts(items, sel, f.key);
    const values = valuesForFacet(f.key, items);
    const chosen = sel[f.key] ?? [];
    const rows = values
      .map((v) => {
        const n = counts[v] ?? 0;
        const on = chosen.includes(v);
        const zero = n === 0 && !on;
        const swatch = f.swatch
          ? `<span class="sw" style="background:${COLOR_SWATCH[v as ColorFamily] ?? 'var(--line)'}"></span>`
          : '';
        // 0 件的档位：.opt.zero 只挡得住鼠标（pointer-events:none），键盘 Tab + 空格
        // 照样能勾上并把页面带进空结果，所以这里同时把 input 设成 disabled。
        return `<label class="opt${on ? ' on' : ''}${zero ? ' zero' : ''}">
        <input type="checkbox" data-facet="${f.key}" value="${escapeAttr(v)}"${on ? ' checked' : ''}${zero ? ' disabled' : ''}>
        ${swatch}<span>${escapeText(v)}</span><span class="n num">${n}</span>
      </label>`;
      })
      .join('');
    return `<div class="fgroup"><span class="eyebrow">${escapeText(f.label)}</span>${rows}</div>`;
  }).join('');
}

/** 渲染已选条件标签 + Clear all，供首屏与每次交互复用 */
export function renderChipsMarkup(sel: Selection, query = ''): string {
  const chips: string[] = [];
  // 搜索关键词也是一个可以单独摘掉的条件，和分面标签排在一起，
  // 否则用户搜完之后没有任何地方能看出「结果为什么少了」，也没法只取消搜索。
  if (query.trim()) {
    chips.push(
      `<span class="chip">&ldquo;${escapeText(query.trim())}&rdquo;<button type="button" data-clear-query aria-label="Clear search">&times;</button></span>`
    );
  }
  for (const key of Object.keys(sel) as FacetKey[]) {
    for (const v of sel[key] ?? []) {
      chips.push(
        `<span class="chip">${escapeText(v)}<button type="button" data-facet="${key}" data-value="${escapeAttr(v)}" aria-label="Remove ${escapeAttr(v)}">&times;</button></span>`
      );
    }
  }
  if (!chips.length) return '';
  return `${chips.join('')}<button type="button" class="clear" id="clearAll">Clear all</button>`;
}

/**
 * 把模板卡片克隆出一张新卡片并填入某件作品的数据。
 * 之所以克隆而不是拼 HTML 字符串，是因为模板本身来自 ArtworkCard.astro 的真实渲染结果，
 * 天然带着 Astro 的作用域样式属性——重新拼字符串会丢失这个属性，卡片就会掉样式。
 *
 * 同理，这里只改克隆出来的节点的 textContent / 属性，绝不 createElement：
 * 新建的节点同样没有作用域属性，`.meta .a i`、`.meta .p small`、`.tagline`
 * 这三条 scoped 规则会当场失配（国别变斜体、版次少了左边距并被当成正文加粗、
 * 精选标签退化成普通文字）。ArtworkCard.astro 为此保证：艺术家名和价格各有
 * 自己的 <span>，"Curator's Pick" 无论选不选中都渲染、只用 hidden 切换。
 */
function buildCard(template: HTMLElement, item: CatalogItem): HTMLElement {
  const node = template.cloneNode(true) as HTMLElement;

  const canvas = node.querySelector<HTMLCanvasElement>('canvas[data-artwork-id]');
  if (canvas) {
    canvas.dataset.artworkId = item.id;
    canvas.style.background = placeholderColor(item);
  }

  const heart = node.querySelector<HTMLButtonElement>('.heart');
  heart?.setAttribute('aria-label', `Save ${item.title}`);

  const inroom = node.querySelector<HTMLAnchorElement>('.inroom');
  inroom?.setAttribute('href', `/artwork/${item.slug}?view=room`);

  const tagline = node.querySelector<HTMLElement>('.tagline');
  if (tagline) tagline.hidden = item.popularity < 88;

  const titleLink = node.querySelector<HTMLAnchorElement>('.titlelink');
  if (titleLink) {
    titleLink.textContent = item.title;
    titleLink.setAttribute('href', `/artwork/${item.slug}`);
  }

  const artistName = node.querySelector<HTMLElement>('.a span');
  if (artistName) artistName.textContent = item.artistName;
  const country = node.querySelector<HTMLElement>('.a i');
  if (country) country.textContent = `· ${item.country}`;

  const dimsP = node.querySelector('.d');
  if (dimsP) dimsP.textContent = `${dimensionsShort(item.widthIn, item.heightIn)} · ${item.medium}`;

  const price = node.querySelector<HTMLElement>('.p span');
  if (price) price.textContent = usd(item.priceUsd);
  const edition = node.querySelector<HTMLElement>('.p small');
  if (edition) edition.textContent = editionLabel(item.edition);

  return node;
}

interface State {
  selection: Selection;
  sort: SortKey;
  shown: number;
  query: string;
}

export function initCatalogPage(items: CatalogItem[]): void {
  const grid = document.querySelector<HTMLElement>('#grid');
  const facetsHost = document.querySelector<HTMLElement>('#facets');
  const chipsHost = document.querySelector<HTMLElement>('#chips');
  const moreHost = document.querySelector<HTMLElement>('#more');
  const resultCountEl = document.querySelector<HTMLElement>('#result-count');
  const sortSelect = document.querySelector<HTMLSelectElement>('#sort');
  const filterToggle = document.querySelector<HTMLElement>('#filterToggle');
  if (!grid || !facetsHost || !chipsHost || !moreHost || !resultCountEl) return;

  // 首屏是未筛选的完整卡片；把其中第一张当模板，后续筛选/排序/翻页都克隆它来生成新卡片。
  const cardTemplate = grid.querySelector<HTMLElement>('article.card');

  const state: State = {
    // 首页的合集卡片/价格入口把筛选条件编码进查询串带过来；未知维度或取值会被丢弃。
    // 每次刷新又会把当前状态写回地址栏（syncUrl），所以这里读到的也可能是用户
    // 自己筛出来、刷新/收藏/分享回来的那份状态。
    selection: parseSelectionFromSearch(location.search, items),
    sort: parseSortFromSearch(location.search),
    shown: PAGE_SIZE,
    query: parseQueryFromSearch(location.search)
  };
  // 排序是自绘下拉（见 ResultsBar.astro 的说明）：隐藏的 <select> 只存值，
  // 触发器上的文字与菜单里的选中态都要跟着它同步。
  const sortValueEl = document.querySelector<HTMLElement>('#sort-value');
  const sortTrigger = document.querySelector<HTMLButtonElement>('#sortTrigger');
  const sortMenu = document.querySelector<HTMLElement>('#sortMenu');
  const sortOptions = sortMenu ? [...sortMenu.querySelectorAll<HTMLElement>('[role="option"]')] : [];

  function syncSortLabel(): void {
    if (!sortSelect) return;
    const label = sortSelect.options[sortSelect.selectedIndex]?.text ?? '';
    if (sortValueEl) sortValueEl.textContent = label;
    for (const opt of sortOptions) {
      opt.setAttribute('aria-selected', String(opt.dataset.value === sortSelect.value));
    }
  }

  function openSortMenu(): void {
    if (!sortMenu || !sortTrigger) return;
    sortMenu.hidden = false;
    sortTrigger.setAttribute('aria-expanded', 'true');
    (sortOptions.find((o) => o.getAttribute('aria-selected') === 'true') ?? sortOptions[0])?.focus();
  }

  function closeSortMenu(focusTrigger = false): void {
    if (!sortMenu || !sortTrigger) return;
    sortMenu.hidden = true;
    sortTrigger.setAttribute('aria-expanded', 'false');
    if (focusTrigger) sortTrigger.focus();
  }

  function chooseSort(value: string): void {
    if (!sortSelect) return;
    sortSelect.value = value;
    // 派发 change，让下面那个既有的 change 处理器统一负责改状态与刷新，
    // 避免自绘控件和键盘/程序化改值各写一份逻辑。
    sortSelect.dispatchEvent(new Event('change', { bubbles: true }));
    closeSortMenu(true);
  }

  if (sortSelect) sortSelect.value = state.sort;
  syncSortLabel();

  const searchForm = document.querySelector<HTMLFormElement>('#site-search');
  const searchInput = searchForm?.querySelector<HTMLInputElement>('input[name="q"]') ?? null;
  if (searchInput) searchInput.value = state.query;

  /** 关键词先把目录缩到一个子集，分面计数与筛选都在这个子集上算 */
  function scoped(): CatalogItem[] {
    return searchItems(items, state.query);
  }

  function currentList(): CatalogItem[] {
    return sortItems(filterItems(scoped(), state.selection), state.sort);
  }

  function renderFacets(): void {
    facetsHost!.innerHTML = renderFacetsMarkup(scoped(), state.selection);
  }

  function renderChips(): void {
    chipsHost!.innerHTML = renderChipsMarkup(state.selection, state.query);
  }

  /**
   * 底部区域：还有剩余就放一个哨兵，滚到它就自动续上一批；到底了给一句收尾。
   *
   * IntersectionObserver 不可用时退回一个真按钮——不做无声降级，
   * 否则那种浏览器里永远只能看到前 24 件而毫无提示。
   */
  function renderMoreHost(all: CatalogItem[]): void {
    const remaining = all.length - state.shown;
    if (remaining <= 0) {
      moreHost!.innerHTML = `<p class="rcount">You&rsquo;ve reached the end of ${all.length} works.</p>`;
      return;
    }
    moreHost!.innerHTML = supportsObserver
      ? `<div class="sentinel" role="status" aria-live="polite">Loading ${Math.min(PAGE_SIZE, remaining)} more works&hellip;</div>`
      : `<button type="button" class="btn" id="loadMore">Load more works (${remaining})</button>`;
    if (supportsObserver) observeSentinel();
  }

  /**
   * 滚动加载。每次只续一批，续完重新观察新的哨兵。
   * 先 disconnect 再 observe：网格重渲染后旧哨兵已经不在文档里，
   * 留着旧的观察目标会让回调在被移除的节点上空转。
   */
  const supportsObserver = typeof IntersectionObserver !== 'undefined';
  let sentinelObserver: IntersectionObserver | undefined;

  function observeSentinel(): void {
    const sentinel = moreHost!.querySelector<HTMLElement>('.sentinel');
    if (!sentinel) return;
    sentinelObserver?.disconnect();
    sentinelObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        sentinelObserver?.disconnect();
        loadMore();
      },
      // 提前 600px 触发，让下一批在用户真正滚到底之前就位，不出现空白等待。
      { rootMargin: '600px 0px' }
    );
    sentinelObserver.observe(sentinel);
  }

  function loadMore(): void {
    const all = currentList();
    if (state.shown >= all.length) return;
    state.shown += PAGE_SIZE;
    renderGrid();
    paintGrid(grid!);
  }

  function renderGrid(): void {
    const all = currentList();
    resultCountEl!.textContent = String(all.length);
    if (filterToggle) {
      const n = activeCount(state.selection);
      filterToggle.textContent = n ? `Filters (${n})` : 'Filters';
    }

    if (!all.length) {
      grid!.innerHTML = '';
      const [heading, hint] = state.query
        ? [`No works match &ldquo;${escapeText(state.query)}&rdquo;`, 'Try a different word, or clear the search.']
        : ['No works match those filters', 'Try removing a filter, or widening your selection.'];
      moreHost!.innerHTML = `<div class="empty"><h3>${heading}</h3><p>${hint}</p></div>`;
      return;
    }

    if (!cardTemplate) return; // 品类页至少有一件作品，理论上不会发生

    const list = all.slice(0, state.shown);
    const frag = document.createDocumentFragment();
    for (const item of list) frag.append(buildCard(cardTemplate, item));
    grid!.replaceChildren(frag);

    renderMoreHost(all);
  }

  /**
   * 把当前筛选与排序写回地址栏。用 replaceState 而不是 pushState：勾一个分面不该
   * 在历史里压一条记录（那样返回键要按十几次才回得到上一页），但地址栏必须跟着变，
   * 否则筛完点进详情页再返回就是一屏没筛过的结果，这份视图也没法刷新/收藏/分享。
   */
  function syncUrl(): void {
    const url = `${location.pathname}${searchFromState(state.selection, state.sort, state.query)}${location.hash}`;
    try {
      history.replaceState(history.state, '', url);
    } catch {
      // 从 file:// 直接打开构建产物时 replaceState 会抛 SecurityError，
      // 地址栏同步本来就是锦上添花，不该把整次刷新连累掉。
    }
  }

  /** 任一筛选/排序控件变化后的完整刷新：分面 → 标签 → 网格 → 重新画布 → 同步地址栏 */
  function refresh(): void {
    renderFacets();
    renderChips();
    renderGrid();
    paintGrid(grid!);
    syncUrl();
  }

  // 首屏是"selection 为空、curated、shown=PAGE_SIZE"这份默认状态下服务端已经渲染好的
  // 样子：结果数、Filters 按钮文案、分面计数、已选标签都已经和这份默认状态一致，
  // 网格里的前 PAGE_SIZE 张卡片也已经由 ArtworkGrid 自己的脚本画好了。
  // 这时如果照搬 refresh() 会把这些真实卡片整块扔掉、克隆空白画布再重画一遍——
  // 白白多花一次绘制、还会让用户看见"先铺满全部再收窄"的跳动。
  // 但如果 URL 带来了预置筛选或非默认排序，首屏这份"未筛选、curated"的服务端渲染就
  // 已经和当前 state 对不上了，上面这条优化的前提不再成立，必须走一次完整的
  // refresh()（分面 + 标签 + 网格 + 重新画布），否则要么看见一屏没筛过的作品，
  // 要么（更糟）看见克隆自首屏卡片、画布数据却对不上的空白画。
  if (activeCount(state.selection) || state.sort !== 'curated' || state.query) {
    refresh();
  } else {
    renderMoreHost(currentList());
  }

  facetsHost.addEventListener('change', (e) => {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>('input[type="checkbox"][data-facet]');
    if (!input) return;
    const key = input.dataset.facet as FacetKey;
    const value = input.value;
    const current = new Set(state.selection[key] ?? []);
    if (input.checked) current.add(value); else current.delete(value);
    if (current.size) state.selection[key] = [...current];
    else delete state.selection[key];
    state.shown = PAGE_SIZE;
    refresh();
  });

  // 列表页上，顶部搜索框改为实时过滤：接管表单提交（否则回车会带着 ?q= 重新
  // 整页跳转，把用户已经勾好的分面全冲掉），输入时防抖 200ms 再刷新。
  // 非列表页没有这段脚本，表单退回普通 GET，回车照样能落到 /paintings/?q=。
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyQuery(searchInput.value);
    });
    let debounce: number | undefined;
    searchInput.addEventListener('input', () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => applyQuery(searchInput.value), 200);
    });
  }

  function applyQuery(raw: string): void {
    const next = raw.trim();
    if (next === state.query) return;
    state.query = next;
    // 关键词换了，原来勾的分面取值可能在新结果里根本不存在，留着会得到空页面。
    // 只保留在当前搜索结果中仍然有作品命中的取值。
    const survivors = scoped();
    for (const key of Object.keys(state.selection) as FacetKey[]) {
      const known = new Set(survivors.map((item) => facetValue(item, key)));
      const kept = (state.selection[key] ?? []).filter((v) => known.has(v));
      if (kept.length) state.selection[key] = kept;
      else delete state.selection[key];
    }
    state.shown = PAGE_SIZE;
    refresh();
  }

  chipsHost.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-clear-query]')) {
      if (searchInput) searchInput.value = '';
      applyQuery('');
      return;
    }
    if (target.closest('#clearAll')) {
      state.selection = {};
      state.query = '';
      if (searchInput) searchInput.value = '';
      state.shown = PAGE_SIZE;
      refresh();
      return;
    }
    const btn = target.closest<HTMLButtonElement>('button[data-facet]');
    if (!btn) return;
    const key = btn.dataset.facet as FacetKey;
    const value = btn.dataset.value ?? '';
    const remaining = (state.selection[key] ?? []).filter((v) => v !== value);
    if (remaining.length) state.selection[key] = remaining;
    else delete state.selection[key];
    state.shown = PAGE_SIZE;
    refresh();
  });

  sortSelect?.addEventListener('change', () => {
    state.sort = sortSelect.value as SortKey;
    state.shown = PAGE_SIZE;
    syncSortLabel();
    refresh();
  });

  sortTrigger?.addEventListener('click', () => {
    sortMenu?.hidden ? openSortMenu() : closeSortMenu();
  });

  sortTrigger?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      openSortMenu();
    }
  });

  sortMenu?.addEventListener('click', (e) => {
    const opt = (e.target as HTMLElement).closest<HTMLElement>('[role="option"]');
    if (opt?.dataset.value) chooseSort(opt.dataset.value);
  });

  sortMenu?.addEventListener('keydown', (e) => {
    const current = sortOptions.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSortMenu(true);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      const next = (current + step + sortOptions.length) % sortOptions.length;
      sortOptions[next]?.focus();
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      (e.key === 'Home' ? sortOptions[0] : sortOptions[sortOptions.length - 1])?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const value = sortOptions[current]?.dataset.value;
      if (value) chooseSort(value);
    } else if (e.key === 'Tab') {
      closeSortMenu();
    }
  });

  // 点到控件外面就收起来；用 pointerdown 而不是 click，
  // 免得在移动端出现「按下时菜单还在、抬手时已经关了」的错位反馈。
  document.addEventListener('pointerdown', (e) => {
    if (sortMenu?.hidden) return;
    if (!(e.target as HTMLElement).closest('.sortish')) closeSortMenu();
  });

  // 没有 IntersectionObserver 时的兜底按钮；有的话这个分支根本不会渲染出来。
  moreHost.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('#loadMore')) return;
    loadMore();
  });

  filterToggle?.addEventListener('click', () => {
    facetsHost.classList.toggle('open');
  });
}
