/** 以 72 英寸长边作为"填满展示框"的参考值 */
export const SCALE_REFERENCE_IN = 72;

/** 显示尺寸下限，避免小画在网格里小到看不清 */
const MIN_LONG_EDGE_PX = 46;

export interface DisplaySize {
  w: number;
  h: number;
}

/**
 * 把真实英寸尺寸换算成展示像素。
 * 长边 = K·√英寸，K = min(boxW, boxH) / √72。
 * 开平方是刻意的压缩：既保住"大画看起来更大"，又不让小画小到无法辨认。
 */
export function displaySize(
  art: { widthIn: number; heightIn: number },
  boxW: number,
  boxH: number
): DisplaySize {
  const K = Math.min(boxW, boxH) / Math.sqrt(SCALE_REFERENCE_IN);
  const longEdge = Math.max(MIN_LONG_EDGE_PX, K * Math.sqrt(Math.max(art.widthIn, art.heightIn)));

  const landscape = art.widthIn >= art.heightIn;
  const w = landscape ? longEdge : (longEdge * art.widthIn) / art.heightIn;
  const h = landscape ? (longEdge * art.heightIn) / art.widthIn : longEdge;

  const fit = Math.min(1, boxW / w, boxH / h);
  return { w: Math.round(w * fit), h: Math.round(h * fit) };
}
