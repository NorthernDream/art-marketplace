import { describe, it, expect } from 'vitest';
import { ARTISTS, artistById, artistBySlug } from './artists';

describe('艺术家数据', () => {
  it('共 40 位', () => {
    expect(ARTISTS.length).toBe(40);
  });

  it('id 与 slug 都唯一', () => {
    expect(new Set(ARTISTS.map(a => a.id)).size).toBe(40);
    expect(new Set(ARTISTS.map(a => a.slug)).size).toBe(40);
  });

  it('slug 是小写连字符格式', () => {
    for (const a of ARTISTS) expect(a.slug, a.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('每位都有非空简介，且不短于 80 字符', () => {
    for (const a of ARTISTS) expect(a.bio.length, a.name).toBeGreaterThanOrEqual(80);
  });

  it('加入年份在 2009 到 2026 之间', () => {
    for (const a of ARTISTS) {
      expect(a.joinedYear).toBeGreaterThanOrEqual(2009);
      expect(a.joinedYear).toBeLessThanOrEqual(2026);
    }
  });

  it('覆盖至少 20 个国家', () => {
    expect(new Set(ARTISTS.map(a => a.country)).size).toBeGreaterThanOrEqual(20);
  });

  it('可以按 id 和 slug 查到', () => {
    const first = ARTISTS[0];
    expect(artistById(first.id)).toEqual(first);
    expect(artistBySlug(first.slug)).toEqual(first);
    expect(artistById('no-such-id')).toBeUndefined();
  });
});

describe('艺术家档案文案', () => {
  it('每位都有创作自述，长度在 120–400 字符之间', () => {
    for (const a of ARTISTS) {
      expect(a.statement.length, `${a.name} 的自述过短或缺失`).toBeGreaterThanOrEqual(120);
      expect(a.statement.length, `${a.name} 的自述过长`).toBeLessThanOrEqual(400);
    }
  });

  it('自述是第一人称，与第三人称的 bio 区分开', () => {
    for (const a of ARTISTS) {
      expect(/\b(I|my|me)\b/.test(a.statement), `${a.name} 的自述不是第一人称`).toBe(true);
      expect(a.statement.startsWith(a.name), `${a.name} 的自述以姓名开头，那是 bio 的写法`).toBe(false);
    }
  });

  it('每位都有 2–4 条展览经历，每条含年份', () => {
    for (const a of ARTISTS) {
      expect(a.exhibitions.length, `${a.name} 的展览条数不对`).toBeGreaterThanOrEqual(2);
      expect(a.exhibitions.length, `${a.name} 的展览条数不对`).toBeLessThanOrEqual(4);
      for (const e of a.exhibitions) {
        expect(e, `${a.name} 的展览缺年份: ${e}`).toMatch(/\b(19|20)\d{2}\b/);
        expect(e.length).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it('展览年份不早于入驻前 15 年，也不晚于 2026', () => {
    for (const a of ARTISTS) {
      for (const e of a.exhibitions) {
        const year = Number(e.match(/\b(19|20)\d{2}\b/)![0]);
        expect(year, `${a.name}: ${e}`).toBeGreaterThanOrEqual(a.joinedYear - 15);
        expect(year, `${a.name}: ${e}`).toBeLessThanOrEqual(2026);
      }
    }
  });

  // 这条守卫是补一笔旧账：此前 40 条 bio 里 67% 共用一个句式骨架，
  // 因为 Phase 1 没有任何页面渲染 bio，问题一直没暴露。艺术家主页会把
  // 40 段文字摆在一起看，模板感立刻现形，所以把「别写成模板」变成断言。
  it('简介的开头不扎堆：同样的前两个词不超过 6 条', () => {
    const openings = new Map<string, number>();
    for (const a of ARTISTS) {
      const key = a.bio.split(/\s+/).slice(0, 2).join(' ').toLowerCase();
      openings.set(key, (openings.get(key) ?? 0) + 1);
    }
    const worst = [...openings.entries()].sort((x, y) => y[1] - x[1])[0]!;
    expect(worst[1], `有 ${worst[1]} 条简介都以「${worst[0]}」开头`).toBeLessThanOrEqual(6);
  });

  it('简介不扎堆使用同一个动词：紧跟姓名的动词最多重复 8 次', () => {
    const verbs = new Map<string, number>();
    for (const a of ARTISTS) {
      // 只统计「姓名 + 动词」这种开头；以别的方式起句的本来就不在扎堆之列
      if (!a.bio.startsWith(a.name)) continue;
      const after = a.bio.slice(a.name.length).trim().split(/\s+/)[0]?.toLowerCase() ?? '';
      if (after) verbs.set(after, (verbs.get(after) ?? 0) + 1);
    }
    const worst = [...verbs.entries()].sort((x, y) => y[1] - x[1])[0];
    if (worst) expect(worst[1], `有 ${worst[1]} 条简介的姓名后都跟「${worst[0]}」`).toBeLessThanOrEqual(8);
  });

  it('自述的开头也不扎堆：同样的前两个词不超过 6 条', () => {
    const openings = new Map<string, number>();
    for (const a of ARTISTS) {
      const key = a.statement.split(/\s+/).slice(0, 2).join(' ').toLowerCase();
      openings.set(key, (openings.get(key) ?? 0) + 1);
    }
    const worst = [...openings.entries()].sort((x, y) => y[1] - x[1])[0]!;
    expect(worst[1], `有 ${worst[1]} 条自述都以「${worst[0]}」开头`).toBeLessThanOrEqual(6);
  });
});

