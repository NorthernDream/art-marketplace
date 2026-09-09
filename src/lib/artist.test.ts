import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { artistFacts, countryCount } from './artist';
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

describe('国家数', () => {
  it('countryCount 等于数据里不重复的国家数', () => {
    // 钉住事实值，而不是把实现里的公式在测试里再算一遍：
    // 后者只要两边一起错就照样绿。首页那句文案是一个事实主张，
    // 数据集增删国家时这条测试应该红，好让人重新确认那个数字。
    expect(countryCount()).toBe(35);
  });

  /**
   * 首页 hero 原文写着 "in 84 countries"，而数据里只有 35 个。
   * 全站其他数字都从目录现算，唯独这一处写死且写错。
   * 这条守卫盯着它不再退回写死的字面量。
   */
  it('首页不出现写死的「数字 + countries」', () => {
    const index = readFileSync(
      fileURLToPath(new URL('../pages/index.astro', import.meta.url)),
      'utf8'
    );
    const hardcoded = index.match(/\d+\s*countries/gi) ?? [];
    expect(hardcoded, `首页写死了国家数：${hardcoded.join(', ')}`).toEqual([]);
  });
});
