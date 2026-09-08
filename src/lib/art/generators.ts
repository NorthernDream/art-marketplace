import { rr, pick, hexa } from './random';
import type { GeneratorName } from '../data/types';

/** 生成器所需的 canvas 2D 接口子集，足以让测试传入一个只记录调用的 mock */
export type PaintContext = Pick<
  CanvasRenderingContext2D,
  | 'fillStyle' | 'strokeStyle' | 'lineWidth' | 'lineCap' | 'lineJoin' | 'globalAlpha'
  | 'fillRect' | 'strokeRect' | 'beginPath' | 'moveTo' | 'lineTo'
  | 'quadraticCurveTo' | 'bezierCurveTo' | 'arc' | 'ellipse' | 'closePath'
  | 'fill' | 'stroke' | 'save' | 'restore' | 'translate' | 'rotate'
  | 'createLinearGradient' | 'createRadialGradient'
>;

export type Generator = (
  ctx: PaintContext,
  w: number,
  h: number,
  rnd: () => number,
  palette: readonly string[]
) => void;

/**
 * 六个绘画生成器迁移自原型 index.html 的 GEN 对象，逻辑与参数范围保持不变
 * （包括 gesture 已经调过一次的描边数与线宽）。drawing 与 print 为本任务新增。
 */

const field: Generator = (ctx, w, h, rnd, palette) => {
  ctx.fillStyle = palette[3]!;
  ctx.fillRect(0, 0, w, h);
  const n = Math.round(rr(rnd, 3, 6));
  let y = h * rr(rnd, 0.02, 0.1);
  for (let i = 0; i < n; i++) {
    const bh = ((h * 0.94) - y) / (n - i) * rr(rnd, 0.75, 1.12);
    const c = pick(rnd, [palette[0]!, palette[1]!, palette[2]!, palette[4]!]);
    const g = ctx.createLinearGradient(0, y, 0, y + bh);
    g.addColorStop(0, hexa(c, 0));
    g.addColorStop(0.14, hexa(c, 0.96));
    g.addColorStop(0.86, hexa(c, 0.96));
    g.addColorStop(1, hexa(c, 0));
    const x0 = w * rr(rnd, 0.02, 0.1);
    const x1 = w - w * rr(rnd, 0.02, 0.1);
    ctx.fillStyle = g;
    ctx.fillRect(x0, y, x1 - x0, bh);
    y += bh + h * rr(rnd, 0.008, 0.04);
  }
};

const gesture: Generator = (ctx, w, h, rnd, palette) => {
  ctx.fillStyle = palette[3]!;
  ctx.fillRect(0, 0, w, h);
  const n = Math.round(rr(rnd, 6, 11));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < n; i++) {
    ctx.strokeStyle = hexa(pick(rnd, [palette[0]!, palette[1]!, palette[2]!, palette[4]!]), rr(rnd, 0.45, 0.98));
    ctx.lineWidth = rr(rnd, w * 0.035, w * 0.15);
    ctx.beginPath();
    ctx.moveTo(rr(rnd, -0.12, 1.12) * w, rr(rnd, -0.12, 1.12) * h);
    ctx.bezierCurveTo(rnd() * w, rnd() * h, rnd() * w, rnd() * h, rr(rnd, -0.12, 1.12) * w, rr(rnd, -0.12, 1.12) * h);
    ctx.stroke();
  }
  for (let i = 0; i < 220; i++) {
    // 干笔飞白
    ctx.fillStyle = hexa(pick(rnd, palette), rr(rnd, 0.05, 0.3));
    const s = rr(rnd, w * 0.004, w * 0.016);
    ctx.fillRect(rnd() * w, rnd() * h, s, s * rr(rnd, 0.4, 1.4));
  }
};

const geometry: Generator = (ctx, w, h, rnd, palette) => {
  ctx.fillStyle = palette[3]!;
  ctx.fillRect(0, 0, w, h);
  const n = Math.round(rr(rnd, 4, 9));
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = hexa(pick(rnd, [palette[0]!, palette[1]!, palette[2]!, palette[4]!]), rr(rnd, 0.72, 1));
    const kind = rnd();
    const x = rr(rnd, -0.05, 0.8) * w;
    const y = rr(rnd, -0.05, 0.8) * h;
    const bw = rr(rnd, 0.14, 0.52) * w;
    const bh = rr(rnd, 0.12, 0.5) * h;
    if (kind < 0.5) {
      ctx.fillRect(x, y, bw, bh);
    } else if (kind < 0.8) {
      ctx.beginPath();
      ctx.arc(x + bw / 2, y + bh / 2, Math.min(bw, bh) / 2, 0, 7);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y + bh);
      ctx.lineTo(x + bw / 2, y);
      ctx.lineTo(x + bw, y + bh);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.strokeStyle = hexa(palette[4]!, 0.85);
  ctx.lineWidth = Math.max(1, w * 0.006);
  ctx.beginPath();
  if (rnd() < 0.5) {
    const yy = rr(rnd, 0.2, 0.8) * h;
    ctx.moveTo(0, yy);
    ctx.lineTo(w, yy);
  } else {
    const xx = rr(rnd, 0.2, 0.8) * w;
    ctx.moveTo(xx, 0);
    ctx.lineTo(xx, h);
  }
  ctx.stroke();
};

const line: Generator = (ctx, w, h, rnd, palette) => {
  ctx.fillStyle = palette[3]!;
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, hexa(palette[2]!, 0.28));
  g.addColorStop(1, hexa(palette[3]!, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const n = Math.round(rr(rnd, 3, 9));
  ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    ctx.strokeStyle = hexa(palette[4]!, rr(rnd, 0.35, 0.9));
    ctx.lineWidth = Math.max(0.8, rr(rnd, w * 0.002, w * 0.008));
    ctx.beginPath();
    const y = rr(rnd, 0.12, 0.9) * h;
    ctx.moveTo(w * rr(rnd, 0.06, 0.3), y);
    ctx.quadraticCurveTo(w * 0.5, y + rr(rnd, -0.06, 0.06) * h, w * rr(rnd, 0.7, 0.94), y + rr(rnd, -0.05, 0.05) * h);
    ctx.stroke();
  }
  ctx.fillStyle = hexa(palette[0]!, 0.92);
  const s = Math.min(w, h) * rr(rnd, 0.05, 0.12);
  ctx.beginPath();
  ctx.arc(w * rr(rnd, 0.2, 0.8), h * rr(rnd, 0.2, 0.8), s, 0, 7);
  ctx.fill();
};

const impasto: Generator = (ctx, w, h, rnd, palette) => {
  ctx.fillStyle = palette[4]!;
  ctx.fillRect(0, 0, w, h);
  const n = Math.round((w * h) / 34);
  for (let i = 0; i < n; i++) {
    const c = pick(rnd, palette);
    const x = rnd() * w;
    const y = rnd() * h;
    const bw = rr(rnd, w * 0.014, w * 0.055);
    const bh = rr(rnd, h * 0.008, h * 0.028);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rr(rnd, -0.7, 0.7));
    ctx.fillStyle = hexa(c, rr(rnd, 0.55, 1));
    ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
    ctx.fillStyle = hexa('#FFFFFF', 0.14);
    ctx.fillRect(-bw / 2, -bh / 2, bw, bh * 0.32);
    ctx.fillStyle = hexa('#000000', 0.12);
    ctx.fillRect(-bw / 2, bh * 0.18, bw, bh * 0.32);
    ctx.restore();
  }
};

const wash: Generator = (ctx, w, h, rnd, palette) => {
  ctx.fillStyle = palette[3]!;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 5; i++) {
    const c = pick(rnd, [palette[0]!, palette[1]!, palette[2]!, palette[4]!]);
    const cx = rnd() * w;
    const cy = rnd() * h;
    const rad = Math.max(w, h) * rr(rnd, 0.3, 0.85);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    g.addColorStop(0, hexa(c, rr(rnd, 0.35, 0.7)));
    g.addColorStop(1, hexa(c, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  const hz = ctx.createLinearGradient(0, h * rr(rnd, 0.45, 0.7), 0, h);
  hz.addColorStop(0, hexa(palette[4]!, 0));
  hz.addColorStop(1, hexa(palette[4]!, 0.4));
  ctx.fillStyle = hz;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 9; i++) {
    // 垂坠的滴痕
    const x = rnd() * w;
    ctx.fillStyle = hexa(pick(rnd, palette), rr(rnd, 0.12, 0.4));
    ctx.fillRect(x, rnd() * h * 0.6, Math.max(1, w * 0.004), h * rr(rnd, 0.08, 0.35));
  }
};

/**
 * drawing —— 炭笔与铅笔素描，单色调。纸色取调色板第 4 位，明暗取第 0、4 位。
 * 先画若干条带压感变化的曲线（quadraticCurveTo + 变化的 lineWidth 模拟下笔轻重），
 * 再叠几块半透明涂抹模拟侧锋铺色，最后用纸色画几道低透明度的擦除痕迹。
 */
const drawing: Generator = (ctx, w, h, rnd, palette) => {
  const paper = palette[3]!;
  const darks = [palette[0]!, palette[4]!];

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, w, h);

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const strokes = Math.round(rr(rnd, 8, 20));
  for (let i = 0; i < strokes; i++) {
    ctx.strokeStyle = hexa(pick(rnd, darks), rr(rnd, 0.4, 0.92));
    ctx.lineWidth = rr(rnd, w * 0.002, w * 0.02); // 压感：线宽随机变化
    ctx.beginPath();
    ctx.moveTo(rr(rnd, 0, w), rr(rnd, 0, h));
    ctx.quadraticCurveTo(rr(rnd, 0, w), rr(rnd, 0, h), rr(rnd, 0, w), rr(rnd, 0, h));
    ctx.stroke();
  }

  const smudges = Math.round(rr(rnd, 3, 6));
  for (let i = 0; i < smudges; i++) {
    // 侧锋涂抹：低透明度色块
    ctx.fillStyle = hexa(pick(rnd, darks), rr(rnd, 0.05, 0.16));
    const sw = rr(rnd, w * 0.12, w * 0.34);
    const sh = rr(rnd, h * 0.08, h * 0.22);
    ctx.fillRect(rr(rnd, 0, w - sw), rr(rnd, 0, h - sh), sw, sh);
  }

  const erases = Math.round(rr(rnd, 2, 4));
  for (let i = 0; i < erases; i++) {
    // 橡皮擦痕：纸色、低透明度的曲线
    ctx.strokeStyle = hexa(paper, rr(rnd, 0.08, 0.2));
    ctx.lineWidth = rr(rnd, w * 0.012, w * 0.045);
    ctx.beginPath();
    const y = rr(rnd, h * 0.1, h * 0.9);
    ctx.moveTo(rr(rnd, 0, w * 0.2), y + rr(rnd, -h * 0.05, h * 0.05));
    ctx.quadraticCurveTo(w * 0.5, y + rr(rnd, -h * 0.08, h * 0.08), rr(rnd, w * 0.8, w), y + rr(rnd, -h * 0.05, h * 0.05));
    ctx.stroke();
  }
};

/**
 * print —— 丝网/木刻套色版画。铺纸色后，从调色板取 2–4 个非纸色，
 * 每色各画一组平面形状（矩形与多边形），并整体偏移 1–3px 制造套印失准；
 * 最后用最深色（第 4 位）画一层轮廓，收束成版画感。
 */
const print: Generator = (ctx, w, h, rnd, palette) => {
  ctx.fillStyle = palette[3]!;
  ctx.fillRect(0, 0, w, h);

  const pool = [palette[0]!, palette[1]!, palette[2]!, palette[4]!];
  const layerCount = Math.round(rr(rnd, 2, 4));
  const used = new Set<number>();
  const layers: string[] = [];
  while (layers.length < layerCount) {
    const idx = Math.floor(rnd() * pool.length);
    if (!used.has(idx)) {
      used.add(idx);
      layers.push(pool[idx]!);
    }
  }

  for (const color of layers) {
    // 偏移量取 1–3px 的量级、符号随机，避免落在 0 附近而让套印看起来是完全对齐的
    const ox = (rnd() < 0.5 ? -1 : 1) * rr(rnd, 1, 3);
    const oy = (rnd() < 0.5 ? -1 : 1) * rr(rnd, 1, 3);
    ctx.save();
    ctx.translate(ox, oy);
    ctx.fillStyle = hexa(color, rr(rnd, 0.75, 0.95));
    const shapes = Math.round(rr(rnd, 2, 4));
    for (let i = 0; i < shapes; i++) {
      if (rnd() < 0.5) {
        const x = rr(rnd, 0, w * 0.7);
        const y = rr(rnd, 0, h * 0.7);
        const rw = rr(rnd, w * 0.16, w * 0.44);
        const rh = rr(rnd, h * 0.16, h * 0.44);
        ctx.fillRect(x, y, rw, rh);
      } else {
        const cx = rr(rnd, w * 0.2, w * 0.8);
        const cy = rr(rnd, h * 0.2, h * 0.8);
        const radius = rr(rnd, w * 0.08, w * 0.22);
        const sides = 3 + Math.floor(rnd() * 3);
        ctx.beginPath();
        for (let s = 0; s < sides; s++) {
          const ang = (s / sides) * Math.PI * 2 + rr(rnd, -0.3, 0.3);
          const px = cx + Math.cos(ang) * radius;
          const py = cy + Math.sin(ang) * radius * rr(rnd, 0.7, 1.1);
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.restore();
  }

  ctx.strokeStyle = hexa(palette[4]!, 0.85);
  ctx.lineWidth = Math.max(1, w * 0.004);
  const outlines = Math.round(rr(rnd, 2, 4));
  for (let i = 0; i < outlines; i++) {
    const x = rr(rnd, w * 0.1, w * 0.6);
    const y = rr(rnd, h * 0.1, h * 0.6);
    const rw = rr(rnd, w * 0.16, w * 0.4);
    const rh = rr(rnd, h * 0.16, h * 0.4);
    ctx.strokeRect(x, y, rw, rh);
  }
};

export const GENERATORS: Record<GeneratorName, Generator> = {
  field, gesture, geometry, line, impasto, wash, drawing, print
};

export { applyTexture } from './texture';
