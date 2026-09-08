import type { Artwork } from '../data/types';
import { PALETTES } from './palettes';
import { GENERATORS } from './generators';
import { applyTexture } from './texture';
import { mulberry32 } from './random';

/** 由作品 id 推出稳定种子，保证同一件作品每次渲染结果一致 */
export function seedFor(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** JS 执行前铺在 canvas 位置上的背景色，避免空白闪烁 */
export function placeholderColor(art: Artwork): string {
  return PALETTES[art.palette][3];
}

export function paintArtwork(
  canvas: HTMLCanvasElement,
  art: Artwork,
  cssW: number,
  cssH: number
): void {
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  canvas.width = Math.max(1, Math.round(cssW * dpr));
  canvas.height = Math.max(1, Math.round(cssH * dpr));
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const seed = seedFor(art.id);
  GENERATORS[art.generator](ctx, cssW, cssH, mulberry32(seed), PALETTES[art.palette]);
  applyTexture(ctx, cssW, cssH, mulberry32(seed + 7717));
}
