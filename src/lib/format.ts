import type { Edition } from './data/types';

export function usd(n: number): string {
  return `$${n.toLocaleString('en-US')}`;
}

export function inchesToCm(i: number): number {
  return Math.round(i * 2.54);
}

export function dimensions(widthIn: number, heightIn: number): string {
  return `${widthIn} × ${heightIn} in / ${inchesToCm(widthIn)} × ${inchesToCm(heightIn)} cm`;
}

/**
 * 只给英寸的短版本，用在网格卡片上。
 * 卡片一行放不下双单位——列宽三百出头时「48 × 36 in / 122 × 91 cm · Oil on Canvas」
 * 会折行，把文字块又撑高一截。厘米换算放在详情页的规格表里给。
 */
export function dimensionsShort(widthIn: number, heightIn: number): string {
  return `${widthIn} × ${heightIn} in`;
}

export function editionLabel(edition: Edition | null): string {
  return edition ? `Edition of ${edition.of} · No. ${edition.n}` : 'Original · 1 available';
}
