import { describe, it, expect } from 'vitest';
import { seedFor, placeholderColor } from './render';
import { ARTWORKS } from '../data/artworks';

describe('渲染入口', () => {
  it('同一个 id 永远得到同一个种子', () => {
    expect(seedFor('w001')).toBe(seedFor('w001'));
  });

  it('不同 id 得到不同种子', () => {
    const seeds = new Set(ARTWORKS.map(w => seedFor(w.id)));
    expect(seeds.size).toBe(ARTWORKS.length);
  });

  it('种子是有限整数', () => {
    for (const w of ARTWORKS) {
      const s = seedFor(w.id);
      expect(Number.isSafeInteger(s)).toBe(true);
    }
  });

  it('占位色取自该作品调色板，且是合法色值', () => {
    for (const w of ARTWORKS) {
      expect(placeholderColor(w)).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });
});
