import { describe, it, expect } from 'vitest';
import { PALETTES, PALETTE_COLOR, COLOR_SWATCH } from './palettes';

describe('调色板', () => {
  it('每组调色板恰好 5 个合法色值', () => {
    for (const [name, colors] of Object.entries(PALETTES)) {
      expect(colors.length, `${name} 色数不对`).toBe(5);
      for (const c of colors) expect(c, `${name} 含非法色值 ${c}`).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });

  it('每组调色板都映射到一个色系', () => {
    for (const name of Object.keys(PALETTES)) {
      expect(PALETTE_COLOR[name as keyof typeof PALETTES], `${name} 缺少色系映射`).toBeTruthy();
    }
  });

  it('每个色系都有对应的筛选栏色块', () => {
    for (const family of Object.values(PALETTE_COLOR)) {
      expect(COLOR_SWATCH[family], `${family} 缺少色块`).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });

  it('至少覆盖 12 组调色板，色系不少于 6 种', () => {
    expect(Object.keys(PALETTES).length).toBeGreaterThanOrEqual(12);
    expect(new Set(Object.values(PALETTE_COLOR)).size).toBeGreaterThanOrEqual(6);
  });
});
