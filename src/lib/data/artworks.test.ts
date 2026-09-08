import { describe, it, expect } from 'vitest';
import { ARTWORKS, artworkById, artworkBySlug, artworksByArtist } from './artworks';
import { ARTISTS } from './artists';
import { PALETTES } from '../art/palettes';

const PAINTING_GENERATORS = ['field','gesture','geometry','line','impasto','wash'];

describe('作品数据', () => {
  it('共 120 件，按品类 70 / 25 / 25 分布', () => {
    expect(ARTWORKS.length).toBe(120);
    const count = (c: string) => ARTWORKS.filter(a => a.category === c).length;
    expect(count('painting')).toBe(70);
    expect(count('drawing')).toBe(25);
    expect(count('print')).toBe(25);
  });

  it('id 与 slug 都唯一', () => {
    expect(new Set(ARTWORKS.map(a => a.id)).size).toBe(120);
    expect(new Set(ARTWORKS.map(a => a.slug)).size).toBe(120);
  });

  it('每件作品都指向存在的艺术家', () => {
    const ids = new Set(ARTISTS.map(a => a.id));
    for (const w of ARTWORKS) expect(ids.has(w.artistId), `${w.title} 的 artistId 无效`).toBe(true);
  });

  it('每位艺术家至少有一件作品', () => {
    for (const a of ARTISTS) {
      expect(artworksByArtist(a.id).length, `${a.name} 没有作品`).toBeGreaterThan(0);
    }
  });

  it('调色板都存在', () => {
    for (const w of ARTWORKS) expect(PALETTES[w.palette], `${w.title} 调色板无效`).toBeTruthy();
  });

  it('生成器与品类匹配', () => {
    for (const w of ARTWORKS) {
      if (w.category === 'painting') expect(PAINTING_GENERATORS).toContain(w.generator);
      if (w.category === 'drawing') expect(w.generator).toBe('drawing');
      if (w.category === 'print') expect(w.generator).toBe('print');
    }
  });

  it('尺寸与价格在合理范围，且覆盖各个档位', () => {
    for (const w of ARTWORKS) {
      expect(w.widthIn).toBeGreaterThanOrEqual(8);
      expect(w.heightIn).toBeGreaterThanOrEqual(8);
      expect(Math.max(w.widthIn, w.heightIn)).toBeLessThanOrEqual(90);
      expect(w.priceUsd).toBeGreaterThanOrEqual(200);
      expect(w.priceUsd).toBeLessThanOrEqual(40000);
    }
    const longest = ARTWORKS.map(w => Math.max(w.widthIn, w.heightIn));
    expect(Math.min(...longest)).toBeLessThanOrEqual(14);
    expect(Math.max(...longest)).toBeGreaterThan(60);
    expect(ARTWORKS.some(w => w.priceUsd < 1000)).toBe(true);
    expect(ARTWORKS.some(w => w.priceUsd >= 10000)).toBe(true);
  });

  it('横幅、竖幅、方形三种朝向都有', () => {
    expect(ARTWORKS.some(w => w.widthIn > w.heightIn)).toBe(true);
    expect(ARTWORKS.some(w => w.heightIn > w.widthIn)).toBe(true);
    expect(ARTWORKS.some(w => w.widthIn === w.heightIn)).toBe(true);
  });

  it('限量版的编号不超过总版数，孤品为 null', () => {
    for (const w of ARTWORKS) {
      if (w.edition) {
        expect(w.edition.n).toBeGreaterThanOrEqual(1);
        expect(w.edition.n).toBeLessThanOrEqual(w.edition.of);
      } else {
        expect(w.edition).toBeNull();
      }
    }
    expect(ARTWORKS.some(w => w.edition === null)).toBe(true);
    expect(ARTWORKS.some(w => w.edition !== null)).toBe(true);
  });

  it('popularity 在 0 到 100 之间，且有精选级作品', () => {
    for (const w of ARTWORKS) {
      expect(w.popularity).toBeGreaterThanOrEqual(0);
      expect(w.popularity).toBeLessThanOrEqual(100);
    }
    expect(ARTWORKS.filter(w => w.popularity >= 88).length).toBeGreaterThanOrEqual(6);
  });

  it('每件作品都有不短于 60 字符的自述', () => {
    for (const w of ARTWORKS) expect(w.statement.length, w.title).toBeGreaterThanOrEqual(60);
  });

  it('可以按 id 和 slug 查到', () => {
    const first = ARTWORKS[0];
    expect(artworkById(first.id)).toEqual(first);
    expect(artworkBySlug(first.slug)).toEqual(first);
    expect(artworkById('nope')).toBeUndefined();
  });
});
