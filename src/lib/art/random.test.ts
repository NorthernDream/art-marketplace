import { describe, it, expect } from 'vitest';
import { mulberry32, rr, pick, hexa } from './random';

describe('确定性随机', () => {
  it('同一个种子产生同一串数值', () => {
    const a = mulberry32(1234);
    const b = mulberry32(1234);
    const seqA = Array.from({ length: 20 }, () => a());
    const seqB = Array.from({ length: 20 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it('不同种子产生不同数值', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it('输出落在 [0,1) 区间', () => {
    const r = mulberry32(99);
    for (let i = 0; i < 500; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('rr 落在给定区间内', () => {
    const r = mulberry32(7);
    for (let i = 0; i < 200; i++) {
      const v = rr(r, 10, 20);
      expect(v).toBeGreaterThanOrEqual(10);
      expect(v).toBeLessThan(20);
    }
  });

  it('pick 总是返回数组内的元素', () => {
    const r = mulberry32(5);
    const arr = ['a', 'b', 'c'];
    for (let i = 0; i < 100; i++) expect(arr).toContain(pick(r, arr));
  });

  it('hexa 把十六进制转成带透明度的 rgba', () => {
    expect(hexa('#FF8000', 0.5)).toBe('rgba(255,128,0,0.5)');
    expect(hexa('#000000', 1)).toBe('rgba(0,0,0,1)');
  });
});
