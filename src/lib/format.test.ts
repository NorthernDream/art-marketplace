import { describe, it, expect } from 'vitest';
import { usd, inchesToCm, dimensions, editionLabel } from './format';

describe('格式化', () => {
  it('价格带千位分隔与美元符号', () => {
    expect(usd(4200)).toBe('$4,200');
    expect(usd(980)).toBe('$980');
    expect(usd(15200)).toBe('$15,200');
  });

  it('英寸换厘米四舍五入到整数', () => {
    expect(inchesToCm(48)).toBe(122);
    expect(inchesToCm(36)).toBe(91);
    expect(inchesToCm(12)).toBe(30);
  });

  it('尺寸同时给出英寸与厘米', () => {
    expect(dimensions(48, 36)).toBe('48 × 36 in / 122 × 91 cm');
  });

  it('孤品与限量版的标签不同', () => {
    expect(editionLabel(null)).toBe('Original · 1 available');
    expect(editionLabel({ n: 7, of: 40 })).toBe('Edition of 40 · No. 7');
  });
});
