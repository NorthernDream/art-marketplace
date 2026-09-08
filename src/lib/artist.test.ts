import { describe, it, expect } from 'vitest';
import { artistFacts } from './artist';
import { ARTISTS } from './data/artists';

describe('艺术家事实（从作品算出，不新增数据）', () => {
  it('每位艺术家都算得出事实，作品数与名录一致', () => {
    for (const a of ARTISTS) {
      const f = artistFacts(a.id);
      expect(f, `${a.name} 算不出事实`).toBeTruthy();
      expect(f!.workCount).toBeGreaterThanOrEqual(1);
    }
  });

  it('全站 40 位的作品数加起来正好是 120 件', () => {
    const total = ARTISTS.reduce((n, a) => n + (artistFacts(a.id)?.workCount ?? 0), 0);
    expect(total).toBe(120);
  });

  it('价格区间取自该艺术家自己的作品，且低不高于高', () => {
    for (const a of ARTISTS) {
      const f = artistFacts(a.id)!;
      expect(f.priceLow).toBeLessThanOrEqual(f.priceHigh);
      for (const w of f.works) {
        expect(w.priceUsd).toBeGreaterThanOrEqual(f.priceLow);
        expect(w.priceUsd).toBeLessThanOrEqual(f.priceHigh);
      }
    }
  });

  it('材质与题材去重且非空，按出现次数从多到少', () => {
    for (const a of ARTISTS) {
      const f = artistFacts(a.id)!;
      expect(f.mediums.length).toBeGreaterThan(0);
      expect(new Set(f.mediums).size).toBe(f.mediums.length);
      expect(new Set(f.subjects).size).toBe(f.subjects.length);
    }
  });

  it('作品按年份从新到旧排列', () => {
    for (const a of ARTISTS) {
      const years = artistFacts(a.id)!.works.map(w => w.year);
      expect([...years].sort((x, y) => y - x)).toEqual(years);
    }
  });

  it('未知 id 返回 undefined，而不是抛错或空壳', () => {
    expect(artistFacts('no-such-artist')).toBeUndefined();
  });
});
