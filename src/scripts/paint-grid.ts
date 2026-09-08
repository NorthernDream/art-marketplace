import { displaySize } from '../lib/scale';
import { paintArtwork } from '../lib/art/render';
import { artworkById } from '../lib/data/artworks';

/** 瀑布流网格的行高细格，与 ArtworkGrid.astro 的 grid-auto-rows 必须一致 */
const ROW_UNIT = 2;

/** --card-gap 读不到时的兜底行间距（与 ArtworkGrid.astro 的桌面端取值一致） */
const FALLBACK_GAP = 44;

/**
 * 把 root 范围内的作品画布画出来。
 *
 * 两种定尺方式：
 * - `.pbox[data-fill]`（列表页卡片）：画布撑满容器宽度，高度由作品长宽比决定，
 *   卡片高度随之而变——这是瀑布流成立的前提。
 * - 其余 `.pbox`（首页主视觉、艺术家小图等固定框）：走 displaySize，
 *   按真实尺寸的相对比例缩放，装进固定框里。
 */
export function paintGrid(root: ParentNode = document): void {
  const canvases = root.querySelectorAll<HTMLCanvasElement>('canvas[data-artwork-id]');
  for (const canvas of canvases) {
    const art = artworkById(canvas.dataset.artworkId!);
    if (!art) continue;
    const box = canvas.closest<HTMLElement>('.pbox');
    if (!box) continue;
    const pad = Number(box.dataset.pad ?? 0);
    const availW = box.clientWidth - pad * 2;
    if (availW <= 0) continue;

    if (box.dataset.fill !== undefined) {
      const w = Math.round(availW);
      const h = Math.max(1, Math.round((w * art.heightIn) / art.widthIn));
      paintArtwork(canvas, art, w, h);
    } else {
      const size = displaySize(art, availW, box.clientHeight - pad * 2);
      paintArtwork(canvas, art, size.w, size.h);
    }
  }
  layoutMasonry(root);
}

/**
 * 量出每张卡片的真实高度，换算成它该占多少个 4px 行格。
 * 必须在画布定尺之后跑——卡片高度是画布高度撑出来的。
 *
 * 之所以把行间距折进跨度而不是交给 row-gap：grid 的 gap 会加在每个行格之间，
 * 4px 的细格会变成 4px+gap 的步长，跨度就完全算不准了。
 */
export function layoutMasonry(root: ParentNode = document): void {
  const grids = new Set<HTMLElement>();
  if (root instanceof HTMLElement && root.classList.contains('grid')) grids.add(root);
  for (const g of root.querySelectorAll<HTMLElement>('.grid')) grids.add(g);

  for (const grid of grids) {
    const gap = parseFloat(getComputedStyle(grid).getPropertyValue('--card-gap')) || FALLBACK_GAP;
    for (const card of grid.querySelectorAll<HTMLElement>('.card')) {
      const height = card.getBoundingClientRect().height;
      if (!height) continue;
      card.style.gridRowEnd = `span ${Math.max(1, Math.ceil((height + gap) / ROW_UNIT))}`;
    }
  }
}

let resizeTimer: number | undefined;

export function watchResize(root: ParentNode = document): void {
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => paintGrid(root), 160);
  });
}
