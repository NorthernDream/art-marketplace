import type { PaintContext } from './generators';

/**
 * 画面完成后的统一做旧：噪点颗粒、织纹网格线、径向暗角，最后一圈画框边线。
 * 迁移自原型 index.html 的 texture()，逻辑不变。
 */
export function applyTexture(ctx: PaintContext, w: number, h: number, rnd: () => number): void {
  const n = Math.round((w * h) / 55);
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)';
    ctx.fillRect(rnd() * w, rnd() * h, 1, 1);
  }

  ctx.strokeStyle = 'rgba(0,0,0,.028)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 3) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.72);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,.16)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(0,0,0,.22)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
}
