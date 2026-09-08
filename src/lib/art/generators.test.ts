import { describe, it, expect } from 'vitest';
import { GENERATORS, applyTexture, type PaintContext } from './generators';
import { mulberry32 } from './random';
import { PALETTES } from './palettes';

/** 记录所有绘制调用的假 context，用来比对两次生成是否完全一致 */
function recorder() {
  const calls: string[] = [];
  const log = (name: string) => (...args: unknown[]) => {
    calls.push(`${name}(${args.map(a => typeof a === 'number' ? a.toFixed(4) : String(a)).join(',')})`);
  };
  const gradient = { addColorStop: log('addColorStop') };
  const ctx = {
    fillStyle: '', strokeStyle: '', lineWidth: 0, lineCap: '', lineJoin: '', globalAlpha: 1,
    fillRect: log('fillRect'), strokeRect: log('strokeRect'), beginPath: log('beginPath'),
    moveTo: log('moveTo'), lineTo: log('lineTo'), quadraticCurveTo: log('quadraticCurveTo'),
    bezierCurveTo: log('bezierCurveTo'), arc: log('arc'), ellipse: log('ellipse'),
    closePath: log('closePath'), fill: log('fill'), stroke: log('stroke'),
    save: log('save'), restore: log('restore'), translate: log('translate'), rotate: log('rotate'),
    createLinearGradient: () => gradient, createRadialGradient: () => gradient
  } as unknown as PaintContext;
  return { ctx, calls };
}

const NAMES = ['field','gesture','geometry','line','impasto','wash','drawing','print'] as const;

describe('作品图生成器', () => {
  it('八个生成器全部注册', () => {
    for (const n of NAMES) expect(typeof GENERATORS[n], `缺少生成器 ${n}`).toBe('function');
    expect(Object.keys(GENERATORS).length).toBe(8);
  });

  it('同种子两次生成的绘制调用完全一致', () => {
    for (const n of NAMES) {
      const a = recorder();
      const b = recorder();
      GENERATORS[n](a.ctx, 300, 240, mulberry32(4242), PALETTES.sea);
      GENERATORS[n](b.ctx, 300, 240, mulberry32(4242), PALETTES.sea);
      expect(a.calls, `${n} 不确定`).toEqual(b.calls);
    }
  });

  it('不同种子产生不同结果', () => {
    for (const n of NAMES) {
      const a = recorder();
      const b = recorder();
      GENERATORS[n](a.ctx, 300, 240, mulberry32(1), PALETTES.ember);
      GENERATORS[n](b.ctx, 300, 240, mulberry32(2), PALETTES.ember);
      expect(a.calls, `${n} 对种子不敏感`).not.toEqual(b.calls);
    }
  });

  it('每个生成器都先铺满底色', () => {
    for (const n of NAMES) {
      const { ctx, calls } = recorder();
      GENERATORS[n](ctx, 300, 240, mulberry32(11), PALETTES.moss);
      expect(calls[0], `${n} 没有先铺底`).toBe('fillRect(0.0000,0.0000,300.0000,240.0000)');
    }
  });

  it('生成器产生足够多的绘制动作', () => {
    for (const n of NAMES) {
      const { ctx, calls } = recorder();
      GENERATORS[n](ctx, 300, 240, mulberry32(3), PALETTES.plum);
      expect(calls.length, `${n} 绘制过少`).toBeGreaterThan(10);
    }
  });

  it('素描生成器只用单色调色板的明暗，不铺满彩色', () => {
    const { ctx, calls } = recorder();
    GENERATORS.drawing(ctx, 300, 240, mulberry32(8), PALETTES.graphite);
    expect(calls.some(c => c.startsWith('stroke('))).toBe(true);
  });

  it('版画生成器使用 2 到 4 个套色区块', () => {
    const { ctx, calls } = recorder();
    GENERATORS.print(ctx, 300, 240, mulberry32(9), PALETTES.tide);
    const fills = calls.filter(c => c.startsWith('fill(') || c.startsWith('fillRect(')).length;
    expect(fills).toBeGreaterThanOrEqual(3);
  });

  it('applyTexture 是确定性的，且会画边框', () => {
    const a = recorder();
    const b = recorder();
    applyTexture(a.ctx, 200, 160, mulberry32(77));
    applyTexture(b.ctx, 200, 160, mulberry32(77));
    expect(a.calls).toEqual(b.calls);
    expect(a.calls.some(c => c.startsWith('strokeRect('))).toBe(true);
  });
});
