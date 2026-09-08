import { describe, it, expect } from 'vitest';
import { displaySize } from './scale';

const BOX = { w: 260, h: 296 };

describe('相对尺寸换算', () => {
  it('保持原始长宽比', () => {
    const s = displaySize({ widthIn: 48, heightIn: 36 }, BOX.w, BOX.h);
    expect(s.w / s.h).toBeCloseTo(48 / 36, 1);
  });

  it('大画显示得比小画大', () => {
    const big = displaySize({ widthIn: 72, heightIn: 72 }, BOX.w, BOX.h);
    const small = displaySize({ widthIn: 12, heightIn: 12 }, BOX.w, BOX.h);
    expect(big.w).toBeGreaterThan(small.w * 1.8);
  });

  it('横幅作品的宽度不被裁到比同尺寸竖幅还小', () => {
    const land = displaySize({ widthIn: 72, heightIn: 48 }, BOX.w, BOX.h);
    const port = displaySize({ widthIn: 48, heightIn: 72 }, BOX.w, BOX.h);
    expect(land.w).toBeGreaterThanOrEqual(port.w);
  });

  it('永远不超出给定的框', () => {
    for (const a of [{ widthIn: 90, heightIn: 20 }, { widthIn: 20, heightIn: 90 }, { widthIn: 80, heightIn: 80 }]) {
      const s = displaySize(a, BOX.w, BOX.h);
      expect(s.w).toBeLessThanOrEqual(BOX.w);
      expect(s.h).toBeLessThanOrEqual(BOX.h);
    }
  });

  it('极小的作品仍有可见下限', () => {
    const s = displaySize({ widthIn: 8, heightIn: 8 }, BOX.w, BOX.h);
    expect(s.h).toBeGreaterThanOrEqual(40);
  });

  it('返回整数像素', () => {
    const s = displaySize({ widthIn: 33, heightIn: 41 }, BOX.w, BOX.h);
    expect(Number.isInteger(s.w)).toBe(true);
    expect(Number.isInteger(s.h)).toBe(true);
  });
});
