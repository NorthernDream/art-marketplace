// 作品详情页的交互脚本：标签切换、?view=room 入口、以及房间比例算法。
//
// 房间比例算法迁移自原型的 layoutRoom()，不做任何重新推导：全部以英寸计量，
// 换算成同一个系数 k 的像素值。画越大，k 越小，沙发（固定 84×33 英寸的参照物）
// 在画面里就越小——这是特意保留的效果，任何人都不能为了构图好看而单独调整某个
// 元素的尺寸或给沙发一个固定像素宽度。
import { displaySize } from '../lib/scale';
import { paintArtwork } from '../lib/art/render';
import type { Artwork } from '../lib/data/types';

const SOFA_W = 84;
const SOFA_H = 33;
const GAP = 9; // 画与沙发的间距
const FLOOR = 24; // 地板带
const PAD = 26; // 房间四周留白

/** 把房间场景摆好：沙发、台灯、地板带与挂在墙上的画，全部按同一个 k 换算 */
export function layoutRoom(room: HTMLElement, artwork: Artwork): void {
  const W = room.clientWidth || 680;
  const H = Math.max(380, Math.min(560, Math.round(W * 0.62)));
  room.style.height = `${H}px`;

  const sceneH = artwork.heightIn + GAP + SOFA_H + FLOOR;
  const sceneW = Math.max(SOFA_W, artwork.widthIn) + 34;
  const k = Math.min((H - PAD * 2) / sceneH, (W - PAD * 2) / sceneW);

  const floorPx = FLOOR * k;
  const sofaW = SOFA_W * k;
  const sofaH = SOFA_H * k;
  const floorY = H - floorPx;

  const floorband = room.querySelector<HTMLElement>('.floorband');
  if (floorband) floorband.style.height = `${floorPx}px`;
  const skirt = room.querySelector<HTMLElement>('.skirt');
  if (skirt) skirt.style.bottom = `${floorPx}px`;

  const sofaX = (W - sofaW) / 2;
  const sofa = room.querySelector<HTMLElement>('.sofa');
  if (sofa) {
    sofa.style.left = `${sofaX}px`;
    sofa.style.top = `${floorY - sofaH + 2 * k}px`;
    sofa.style.width = `${sofaW}px`;
    sofa.style.height = `${sofaH}px`;
  }

  const lampW = 20 * k;
  const lampH = 62 * k;
  const lamp = room.querySelector<HTMLElement>('.lamp');
  if (lamp) {
    const lampX = Math.min(W - lampW - 10, sofaX + sofaW + 10 * k);
    lamp.style.left = `${lampX}px`;
    lamp.style.top = `${floorY - lampH + 1.5 * k}px`;
    lamp.style.width = `${lampW}px`;
    lamp.style.height = `${lampH}px`;
    lamp.style.display = lampX + lampW > W ? 'none' : '';
  }

  const aw = artwork.widthIn * k;
  const ah = artwork.heightIn * k;
  const art = room.querySelector<HTMLElement>('.art');
  if (art) {
    art.style.left = `${(W - aw) / 2}px`;
    art.style.top = `${floorY - sofaH - GAP * k - ah}px`;
    art.style.width = `${aw}px`;
    art.style.height = `${ah}px`;
  }

  // 房间里的画布不归 paintGrid 管——它按 .pbox 的容器尺寸取值，
  // 这里的尺寸是 k 换算出来的，必须直接调 paintArtwork。
  const canvas = room.querySelector<HTMLCanvasElement>('.art canvas');
  if (canvas) paintArtwork(canvas, artwork, Math.round(aw), Math.round(ah));
}

/** Artwork 标签页的大图舞台：按 .stage 内容区尺寸重新画 */
function paintStage(stage: HTMLElement, artwork: Artwork): void {
  const canvas = stage.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) return;
  const pad = Number(stage.dataset.pad ?? 0);
  const boxW = Math.max(1, stage.clientWidth - pad * 2);
  const boxH = Math.max(1, stage.clientHeight - pad * 2);
  const size = displaySize(artwork, boxW, boxH);
  paintArtwork(canvas, artwork, size.w, size.h);
}

let toastTimer: number | undefined;

function toast(message: string): void {
  // #toast 是页面级的单例节点，挂在 [data-artwork-page] 之外（Base 布局的 slot 里），
  // 所以这里直接查 document，不从 root 的子树里找。
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('on');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('on'), 2200);
}

type Tab = 'artwork' | 'room';

/** 页面初始化：标签切换（含 ?view=room 直达）、resize 重新布局、购买按钮弹 toast */
export function initArtworkPage(artwork: Artwork): void {
  const root = document.querySelector<HTMLElement>('[data-artwork-page]');
  if (!root) return;

  const tabButtons = root.querySelectorAll<HTMLButtonElement>('.tab[data-tab]');
  const panelArtwork = root.querySelector<HTMLElement>('#panel-artwork');
  const panelRoom = root.querySelector<HTMLElement>('#panel-room');
  const stage = root.querySelector<HTMLElement>('.stage');
  const room = root.querySelector<HTMLElement>('.room');

  let activeTab: Tab =
    new URLSearchParams(window.location.search).get('view') === 'room' ? 'room' : 'artwork';

  function show(tab: Tab): void {
    activeTab = tab;
    for (const btn of tabButtons) {
      btn.setAttribute('aria-selected', String(btn.dataset.tab === tab));
    }
    if (panelArtwork) panelArtwork.hidden = tab !== 'artwork';
    if (panelRoom) panelRoom.hidden = tab !== 'room';
    if (tab === 'artwork' && stage) paintStage(stage, artwork);
    if (tab === 'room' && room) layoutRoom(room, artwork);
  }

  for (const btn of tabButtons) {
    btn.addEventListener('click', () => {
      const tab = (btn.dataset.tab as Tab) ?? 'artwork';
      if (tab !== activeTab) show(tab);
    });
  }

  show(activeTab);

  let resizeTimer: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => show(activeTab), 160);
  });

  // Phase 1 没有状态层：Add to Cart / Make an Offer 只弹 toast，不写购物车状态。
  root.querySelector('#addCart')?.addEventListener('click', () => {
    toast(`“${artwork.title}” added to cart`);
  });
  root.querySelector('#offer')?.addEventListener('click', () => {
    toast('Offer sent to the artist — they usually reply within 48 hours');
  });
}
