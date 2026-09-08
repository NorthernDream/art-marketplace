import type { Artwork, Artist } from './data/types';
import { PALETTE_COLOR } from './art/palettes';
import { mulberry32 } from './art/random';
import { seedFor } from './art/render';

export type CatalogItem = Artwork & { artistName: string; country: string };

export const SIZE_ORDER = [
  'Extra Small (to 14 in)',
  'Small (14–24 in)',
  'Medium (24–40 in)',
  'Large (40–60 in)',
  'Extra Large (60 in +)'
];

export const PRICE_ORDER = [
  'Under $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000 +'
];

export type FacetKey =
  | 'subject' | 'style' | 'medium' | 'size'
  | 'orientation' | 'price' | 'color' | 'country';

export const FACETS: { key: FacetKey; label: string; swatch?: boolean }[] = [
  { key: 'subject', label: 'Subject' },
  { key: 'style', label: 'Style' },
  { key: 'medium', label: 'Medium' },
  { key: 'size', label: 'Size' },
  { key: 'orientation', label: 'Orientation' },
  { key: 'price', label: 'Price' },
  { key: 'color', label: 'Colour', swatch: true },
  { key: 'country', label: 'Artist Country' }
];

export type Selection = Partial<Record<FacetKey, string[]>>;
export type SortKey = 'curated' | 'newest' | 'popular' | 'price-asc' | 'price-desc';

/** 与 ResultsBar 的排序下拉一一对应；curated 是默认值，不写进查询串 */
export const SORT_KEYS: SortKey[] = ['curated', 'newest', 'popular', 'price-asc', 'price-desc'];

export function sizeBand(maxIn: number): string {
  if (maxIn <= 14) return SIZE_ORDER[0]!;
  if (maxIn <= 24) return SIZE_ORDER[1]!;
  if (maxIn <= 40) return SIZE_ORDER[2]!;
  if (maxIn <= 60) return SIZE_ORDER[3]!;
  return SIZE_ORDER[4]!;
}

export function priceBand(usdValue: number): string {
  if (usdValue < 1000) return PRICE_ORDER[0]!;
  if (usdValue < 2500) return PRICE_ORDER[1]!;
  if (usdValue < 5000) return PRICE_ORDER[2]!;
  if (usdValue < 10000) return PRICE_ORDER[3]!;
  return PRICE_ORDER[4]!;
}

export function orientation(w: number, h: number): string {
  const ratio = w / h;
  if (Math.abs(1 - ratio) < 0.06) return 'Square';
  return ratio > 1 ? 'Landscape' : 'Portrait';
}

export function buildCatalog(artworks: Artwork[], artists: Artist[]): CatalogItem[] {
  const byId = new Map(artists.map(a => [a.id, a]));
  return artworks.map(w => {
    const artist = byId.get(w.artistId);
    if (!artist) throw new Error(`作品 ${w.id} 指向不存在的艺术家 ${w.artistId}`);
    return { ...w, artistName: artist.name, country: artist.country };
  });
}

export function facetValue(item: CatalogItem, key: FacetKey): string {
  switch (key) {
    case 'subject': return item.subject;
    case 'style': return item.style;
    case 'medium': return item.medium;
    case 'size': return sizeBand(Math.max(item.widthIn, item.heightIn));
    case 'orientation': return orientation(item.widthIn, item.heightIn);
    case 'price': return priceBand(item.priceUsd);
    case 'color': return PALETTE_COLOR[item.palette];
    case 'country': return item.country;
  }
}

/** skip 指定的维度会被忽略，用于分面计数 */
function passes(item: CatalogItem, sel: Selection, skip?: FacetKey): boolean {
  for (const key of Object.keys(sel) as FacetKey[]) {
    if (key === skip) continue;
    const chosen = sel[key];
    if (!chosen || chosen.length === 0) continue;
    if (!chosen.includes(facetValue(item, key))) return false;
  }
  return true;
}

export function filterItems(items: CatalogItem[], sel: Selection): CatalogItem[] {
  return items.filter(i => passes(i, sel));
}

/**
 * 分面计数：算某个维度的分布时忽略该维度自身已选的值，
 * 这样用户选中"蓝色"后，其余颜色仍然显示各自还有多少件。
 */
export function facetCounts(
  items: CatalogItem[],
  sel: Selection,
  key: FacetKey
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    if (!passes(item, sel, key)) continue;
    const v = facetValue(item, key);
    counts[v] = (counts[v] ?? 0) + 1;
  }
  return counts;
}

/**
 * 详情页底部的"同题材相关作品"。
 *
 * 直接取同题材的前四件会让整个题材塌成一份推荐：Architecture 共 27 件，其中 23 个
 * 页面推荐的是同样那四件，相邻两件还互相推荐。这里改成用作品自己的 id 作种子把
 * 同题材候选洗一遍再取前 n 件——种子只取决于作品 id，所以同一件作品每次构建
 * （以及每次访问）拿到的永远是同一组推荐，但不同作品各不相同。
 */
/**
 * 关键词是否命中某件作品：作品名、艺术家、国别、题材、风格、材质六个字段任一包含即可。
 * 大小写不敏感；空串一律视为命中（不构成筛选）。
 * 只做子串匹配，不做分词或模糊——目录只有 120 件，够用且行为可预测。
 */
export function matchesQuery(item: CatalogItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [item.title, item.artistName, item.country, item.subject, item.style, item.medium].some(
    (field) => field.toLowerCase().includes(q)
  );
}

/**
 * 关键词把目录缩到一个子集。分面计数、筛选、排序随后都在这个子集上进行，
 * 所以搜索之后筛选栏显示的是「搜索结果里」各维度的分布，而不是全目录的分布。
 */
export function searchItems(items: CatalogItem[], query: string): CatalogItem[] {
  return query.trim() ? items.filter((item) => matchesQuery(item, query)) : items;
}

export function relatedWorks(items: CatalogItem[], target: CatalogItem, n: number): CatalogItem[] {
  const pool = items.filter((item) => item.id !== target.id && item.subject === target.subject);
  const rnd = mulberry32(seedFor(target.id));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = pool[i]!;
    pool[i] = pool[j]!;
    pool[j] = tmp;
  }
  return pool.slice(0, n);
}

export function sortItems(items: CatalogItem[], key: SortKey): CatalogItem[] {
  const out = items.slice();
  switch (key) {
    case 'newest': return out.sort((a, b) => b.year - a.year || b.popularity - a.popularity);
    case 'popular': return out.sort((a, b) => b.popularity - a.popularity);
    case 'price-asc': return out.sort((a, b) => a.priceUsd - b.priceUsd);
    case 'price-desc': return out.sort((a, b) => b.priceUsd - a.priceUsd);
    case 'curated': return out;
  }
}
