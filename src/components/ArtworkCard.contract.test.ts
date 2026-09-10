import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// 项目是 ESM，没有 __dirname，用 import.meta.url 定位
const card = readFileSync(fileURLToPath(new URL('./ArtworkCard.astro', import.meta.url)), 'utf8');

/**
 * catalog-page.ts 的 buildCard() 克隆首屏渲染出的卡片再填数据，只改 textContent
 * 与属性、绝不 createElement——新建的节点拿不到 Astro 的作用域样式属性。
 * 因此这几个节点必须在模板里就存在。删掉任何一个都不会报构建错、不会挂别的测试，
 * 但每次筛选都会丢样式或丢内容。carry-forward 点名这是本分支最脆弱的接缝。
 */
const REQUIRED = [
  { selector: '.tagline', why: 'Curator’s Pick 标签，无论选不选中都渲染，只用 hidden 切换' },
  { selector: 'canvas[data-artwork-id]', why: '画布，buildCard 要改 data-artwork-id 与背景色' },
  { selector: '.titlelink', why: '标题链接，伸展链接的真实可点元素' },
  { selector: '.a span', why: '艺术家名，必须独立成节点供脚本写入' },
  { selector: '.a i', why: '国别，scoped 规则把它改回非斜体并降为 --ink-3' },
  { selector: '.p span', why: '价格，必须独立成节点供脚本写入' },
  { selector: '.p small', why: '版次说明，scoped 规则给它左边距并降权重' }
];

describe('ArtworkCard 与 buildCard 的契约', () => {
  it('模板里含有 buildCard 依赖的全部节点（含 REQUIRED 里记录的理由）', () => {
    // 用最朴素的形态断言：这些标记在模板源码里必须找得到。
    // 艺术家名与价格两条带着父元素一起写成子串（'<p class="a"><span>'、
    // '<p class="p num"><span>'），而不是分别断言 '<p class="a">' 和 '<span>'：
    // 后者哪怕 <span> 被拍平掉（比如 <p class="a">{name} <i>...）也照样能各自
    // 找到匹配，测不出结构被破坏；带父元素的子串形式会在拍平后立刻找不到，
    // 才能测出 REQUIRED 里点名"必须独立成节点供脚本写入"的这两个节点真的还在。
    const marks = [
      'class="tagline"',
      'data-artwork-id',
      'class="titlelink"',
      '<p class="a"><span>',
      '<i>',
      '<p class="p num"><span>',
      '<small>'
    ];
    for (const m of marks) {
      expect(card.includes(m), `ArtworkCard.astro 缺少 ${m}，buildCard 会静默失效`).toBe(true);
    }
  });
});
