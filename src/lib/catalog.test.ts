import { describe, it, expect } from 'vitest';
import {
  buildCatalog, filterItems, facetCounts, sortItems, relatedWorks,
  matchesQuery, searchItems,
  sizeBand, priceBand, orientation, SIZE_ORDER, PRICE_ORDER
} from './catalog';
import { ARTWORKS } from './data/artworks';
import { ARTISTS } from './data/artists';

const ITEMS = buildCatalog(ARTWORKS, ARTISTS);

describe('派生字段', () => {
  it('尺寸档按最长边划分', () => {
    expect(sizeBand(12)).toBe(SIZE_ORDER[0]);
    expect(sizeBand(20)).toBe(SIZE_ORDER[1]);
    expect(sizeBand(36)).toBe(SIZE_ORDER[2]);
    expect(sizeBand(50)).toBe(SIZE_ORDER[3]);
    expect(sizeBand(72)).toBe(SIZE_ORDER[4]);
  });

  it('价格档划分正确', () => {
    expect(priceBand(500)).toBe(PRICE_ORDER[0]);
    expect(priceBand(1800)).toBe(PRICE_ORDER[1]);
    expect(priceBand(3200)).toBe(PRICE_ORDER[2]);
    expect(priceBand(7000)).toBe(PRICE_ORDER[3]);
    expect(priceBand(15000)).toBe(PRICE_ORDER[4]);
  });

  it('朝向判定正确，接近正方形算方形', () => {
    expect(orientation(48, 36)).toBe('Landscape');
    expect(orientation(36, 48)).toBe('Portrait');
    expect(orientation(36, 36)).toBe('Square');
    expect(orientation(36, 37)).toBe('Square');
  });
});

describe('目录', () => {
  it('每条都带上了艺术家姓名与国别', () => {
    expect(ITEMS.length).toBe(ARTWORKS.length);
    for (const i of ITEMS) {
      expect(i.artistName.length).toBeGreaterThan(0);
      expect(i.country.length).toBeGreaterThan(0);
    }
  });

  it('单维度筛选只保留匹配项', () => {
    const out = filterItems(ITEMS, { color: ['Blue'] });
    expect(out.length).toBeGreaterThan(0);
    expect(out.length).toBeLessThan(ITEMS.length);
  });

  it('同一维度多选是"或"的关系', () => {
    const blue = filterItems(ITEMS, { color: ['Blue'] }).length;
    const green = filterItems(ITEMS, { color: ['Green'] }).length;
    const both = filterItems(ITEMS, { color: ['Blue', 'Green'] }).length;
    expect(both).toBe(blue + green);
  });

  it('跨维度筛选是"且"的关系', () => {
    const sel = { color: ['Blue'], orientation: ['Landscape'] };
    const out = filterItems(ITEMS, sel);
    for (const i of out) {
      expect(i.widthIn).toBeGreaterThan(i.heightIn);
    }
    expect(out.length).toBeLessThanOrEqual(filterItems(ITEMS, { color: ['Blue'] }).length);
  });

  it('空筛选返回全部', () => {
    expect(filterItems(ITEMS, {}).length).toBe(ITEMS.length);
  });

  it('分面计数排除自身维度：选了蓝色后，其他颜色的数量保持不变', () => {
    const before = facetCounts(ITEMS, {}, 'color');
    const after = facetCounts(ITEMS, { color: ['Blue'] }, 'color');
    expect(after).toEqual(before);
  });

  it('分面计数受其他维度影响', () => {
    const all = facetCounts(ITEMS, {}, 'color');
    const narrowed = facetCounts(ITEMS, { orientation: ['Portrait'] }, 'color');
    expect(narrowed['Blue']).toBeLessThanOrEqual(all['Blue']!);
    const sum = Object.values(narrowed).reduce((a, b) => a + b, 0);
    expect(sum).toBe(filterItems(ITEMS, { orientation: ['Portrait'] }).length);
  });

  it('价格排序方向正确', () => {
    const asc = sortItems(ITEMS, 'price-asc');
    const desc = sortItems(ITEMS, 'price-desc');
    expect(asc[0]!.priceUsd).toBeLessThanOrEqual(asc[asc.length - 1]!.priceUsd);
    expect(desc[0]!.priceUsd).toBeGreaterThanOrEqual(desc[desc.length - 1]!.priceUsd);
  });

  it('最新与最受欢迎排序正确', () => {
    const newest = sortItems(ITEMS, 'newest');
    expect(newest[0]!.year).toBeGreaterThanOrEqual(newest[newest.length - 1]!.year);
    const popular = sortItems(ITEMS, 'popular');
    expect(popular[0]!.popularity).toBeGreaterThanOrEqual(popular[popular.length - 1]!.popularity);
  });

  it('排序不改变原数组，也不丢失条目', () => {
    const snapshot = ITEMS.map(i => i.id);
    const sorted = sortItems(ITEMS, 'price-asc');
    expect(ITEMS.map(i => i.id)).toEqual(snapshot);
    expect(sorted.length).toBe(ITEMS.length);
  });
});

describe('相关作品', () => {
  it('只取同题材，且不含作品自己', () => {
    for (const target of ITEMS.slice(0, 20)) {
      const related = relatedWorks(ITEMS, target, 4);
      expect(related.length).toBeLessThanOrEqual(4);
      for (const item of related) {
        expect(item.id).not.toBe(target.id);
        expect(item.subject).toBe(target.subject);
      }
    }
  });

  it('同一件作品每次得到同一组推荐', () => {
    const target = ITEMS[7]!;
    const a = relatedWorks(ITEMS, target, 4).map(i => i.id);
    const b = relatedWorks(ITEMS, target, 4).map(i => i.id);
    expect(a).toEqual(b);
  });

  it('不改动传入的数组', () => {
    const snapshot = ITEMS.map(i => i.id);
    relatedWorks(ITEMS, ITEMS[3]!, 4);
    expect(ITEMS.map(i => i.id)).toEqual(snapshot);
  });

  it('同题材的各个页面不再推荐同样四件', () => {
    const subject = 'Architecture';
    const inSubject = ITEMS.filter(i => i.subject === subject);
    expect(inSubject.length).toBeGreaterThan(4);
    const combos = new Set(inSubject.map(i => relatedWorks(ITEMS, i, 4).map(r => r.id).join(',')));
    // 27 个页面至少要有 20 组不同的推荐，而不是 4 组
    expect(combos.size).toBeGreaterThanOrEqual(20);
  });
});

describe('关键词搜索', () => {
  const first = ITEMS[0]!;

  it('空串不构成筛选，原样返回全部', () => {
    expect(searchItems(ITEMS, '').length).toBe(ITEMS.length);
    expect(searchItems(ITEMS, '   ').length).toBe(ITEMS.length);
    expect(matchesQuery(first, '')).toBe(true);
  });

  it('大小写不敏感', () => {
    expect(matchesQuery(first, first.title.toUpperCase())).toBe(true);
    expect(matchesQuery(first, first.title.toLowerCase())).toBe(true);
  });

  it('六个字段都能命中', () => {
    for (const field of [first.title, first.artistName, first.country, first.subject, first.style, first.medium]) {
      expect(matchesQuery(first, field)).toBe(true);
    }
  });

  it('子串即可命中，不要求整词', () => {
    expect(matchesQuery(first, first.title.slice(1, 5))).toBe(true);
  });

  it('搜不到的词得到空集，而不是全集', () => {
    expect(searchItems(ITEMS, 'zzzznotaword').length).toBe(0);
  });

  it('按艺术家搜出来的每一件都确实属于这位艺术家或提到了这个词', () => {
    const name = first.artistName;
    const hits = searchItems(ITEMS, name);
    expect(hits.length).toBeGreaterThan(0);
    for (const item of hits) expect(matchesQuery(item, name)).toBe(true);
  });

  it('不改动传入的数组', () => {
    const snapshot = ITEMS.map(i => i.id);
    searchItems(ITEMS, 'oil');
    expect(ITEMS.map(i => i.id)).toEqual(snapshot);
  });
});
