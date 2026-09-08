import { describe, it, expect } from 'vitest';
import {
  parseSelectionFromSearch, parseSortFromSearch, parseQueryFromSearch, searchFromState
} from './catalog-page';
import { buildCatalog } from '../lib/catalog';
import { ARTWORKS } from '../lib/data/artworks';
import { ARTISTS } from '../lib/data/artists';

const ITEMS = buildCatalog(ARTWORKS, ARTISTS).filter((item) => item.category === 'painting');

describe('parseSelectionFromSearch', () => {
  it('解析出合法维度上的合法取值', () => {
    expect(parseSelectionFromSearch('?color=Blue', ITEMS)).toEqual({ color: ['Blue'] });
  });

  it('同一维度可以重复出现多次，表示多选', () => {
    const sel = parseSelectionFromSearch(
      '?size=Large+(40%E2%80%9360+in)&size=Extra+Large+(60+in+%2B)',
      ITEMS
    );
    expect(sel).toEqual({ size: ['Large (40–60 in)', 'Extra Large (60 in +)'] });
  });

  it('多个不同维度同时生效', () => {
    const sel = parseSelectionFromSearch('?color=Blue&price=Under+%241%2C000', ITEMS);
    expect(sel).toEqual({ color: ['Blue'], price: ['Under $1,000'] });
  });

  it('不是 FacetKey 的键被忽略', () => {
    expect(parseSelectionFromSearch('?nosuchfacet=x', ITEMS)).toEqual({});
  });

  it('合法维度上不存在的取值被忽略，而不是产生空结果', () => {
    expect(parseSelectionFromSearch('?color=Chartreuse', ITEMS)).toEqual({});
  });

  it('同一维度里部分取值合法、部分不合法时，只保留合法的那些', () => {
    expect(parseSelectionFromSearch('?color=Blue&color=Chartreuse', ITEMS)).toEqual({
      color: ['Blue']
    });
  });

  it('空查询串返回空筛选', () => {
    expect(parseSelectionFromSearch('', ITEMS)).toEqual({});
  });
});

describe('parseSortFromSearch', () => {
  it('读出合法的排序键', () => {
    expect(parseSortFromSearch('?sort=price-asc')).toBe('price-asc');
  });

  it('缺省或非法值退回 curated', () => {
    expect(parseSortFromSearch('')).toBe('curated');
    expect(parseSortFromSearch('?sort=by-vibes')).toBe('curated');
  });
});

describe('searchFromState', () => {
  it('默认状态不产生查询串', () => {
    expect(searchFromState({}, 'curated')).toBe('');
  });

  it('curated 是默认排序，不写进查询串', () => {
    expect(searchFromState({ color: ['Blue'] }, 'curated')).toBe('?color=Blue');
  });

  it('非默认排序作为 sort 附在末尾', () => {
    expect(searchFromState({}, 'price-desc')).toBe('?sort=price-desc');
  });

  it('同一维度的多选重复出现同一个键——与首页 categoryHref 的编码一致', () => {
    const search = searchFromState({ size: ['Large (40–60 in)', 'Extra Large (60 in +)'] }, 'curated');
    expect(search).toBe('?size=Large+%2840%E2%80%9360+in%29&size=Extra+Large+%2860+in+%2B%29');
  });

  it('写出去再读回来是同一份筛选与排序', () => {
    const selection = { color: ['Blue'], price: ['Under $1,000'] };
    const search = searchFromState(selection, 'newest');
    expect(parseSelectionFromSearch(search, ITEMS)).toEqual(selection);
    expect(parseSortFromSearch(search)).toBe('newest');
  });
});

describe('搜索关键词的查询串往返', () => {
  it('缺省时是空串', () => {
    expect(parseQueryFromSearch('')).toBe('');
    expect(parseQueryFromSearch('?color=Blue')).toBe('');
  });

  it('读出来时去掉首尾空白', () => {
    expect(parseQueryFromSearch('?q=%20%20oil%20%20')).toBe('oil');
  });

  it('空白关键词不写进查询串', () => {
    expect(searchFromState({}, 'curated', '   ')).toBe('');
  });

  it('关键词附在分面与排序之后', () => {
    expect(searchFromState({ color: ['Blue'] }, 'newest', 'harbour'))
      .toBe('?color=Blue&sort=newest&q=harbour');
  });

  it('写出去再读回来是同一个关键词，含空格与特殊字符', () => {
    const q = 'oil on linen';
    const search = searchFromState({}, 'curated', q);
    expect(parseQueryFromSearch(search)).toBe(q);
  });

  it('关键词与分面、排序三者同时往返不互相干扰', () => {
    const selection = { color: ['Blue'] };
    const search = searchFromState(selection, 'price-asc', 'study');
    expect(parseSelectionFromSearch(search, ITEMS)).toEqual(selection);
    expect(parseSortFromSearch(search)).toBe('price-asc');
    expect(parseQueryFromSearch(search)).toBe('study');
  });
});
