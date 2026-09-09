import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// 项目是 ESM，没有 __dirname，用 import.meta.url 定位
const css = readFileSync(fileURLToPath(new URL('./tokens.css', import.meta.url)), 'utf8');

const COLOR_TOKENS = [
  '--paper', '--surface', '--ink', '--ink-2', '--ink-3',
  '--line', '--line-2', '--line-strong', '--accent', '--accent-soft', '--wall', '--floor'
];
const OTHER_TOKENS = [
  '--f-display', '--f-title', '--f-ui',
  '--gut', '--maxw', '--header-h', '--rbar-h'
];

function declarations(source: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of source.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

describe('设计 token', () => {
  const decls = declarations(css);

  it('声明了全部颜色 token', () => {
    for (const t of COLOR_TOKENS) expect(decls.has(t), `缺少 ${t}`).toBe(true);
  });

  it('声明了字体与布局 token', () => {
    for (const t of OTHER_TOKENS) expect(decls.has(t), `缺少 ${t}`).toBe(true);
  });

  it('每个颜色 token 都是合法的 6 位十六进制', () => {
    for (const t of COLOR_TOKENS) {
      expect(decls.get(t), `${t} 不是合法色值`).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('没有重复声明同一个 token', () => {
    const names = [...css.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map(m => m[1]);
    expect(new Set(names).size).toBe(names.length);
  });
});

/**
 * WCAG 2.x 相对亮度与对比度。放在测试里而不是 lib 里：站点运行时不需要算对比度，
 * 这是给 token 值把关的尺子，不是产品代码。
 */
function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

describe('token 对比度', () => {
  const decls = declarations(css);
  const color = (name: string): string => {
    const v = decls.get(name);
    if (!v) throw new Error(`缺少 token ${name}`);
    return v;
  };

  // --paper 比 --surface 深，正文落在 --paper 上时比值更低，是两者中更难过的那个
  const BACKGROUNDS = ['--paper', '--surface'];

  it('正文色在两种底色上都达到 AA 4.5:1', () => {
    for (const fg of ['--ink', '--ink-2', '--ink-3']) {
      for (const bg of BACKGROUNDS) {
        const ratio = contrast(color(fg), color(bg));
        expect(ratio, `${fg} ${color(fg)} 在 ${bg} 上只有 ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it('强调色作为链接与标签文字达到 AA 4.5:1', () => {
    for (const bg of BACKGROUNDS) {
      const ratio = contrast(color('--accent'), color(bg));
      expect(ratio, `--accent 在 ${bg} 上只有 ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('反白文字在实心底上达到 AA 4.5:1', () => {
    // .btn.solid 是 --paper 压在 --ink 上，购物车徽标是 --surface 压在 --accent 上
    for (const [fg, bg] of [['--paper', '--ink'], ['--surface', '--accent']]) {
      const ratio = contrast(color(fg), color(bg));
      expect(ratio, `${fg} 在 ${bg} 上只有 ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
    }
  });

  /**
   * --line 是装饰性发丝线（分节线、表格线），无障碍标准不要求它达标，
   * 压深会毁掉白盒画廊的观感。可交互控件的边框是另一回事：搜索框、
   * 复选框这类边界是用户要找的目标，单列一个 token 并按非文本 3:1 把关。
   */
  it('可交互控件的边框色达到非文本 3:1', () => {
    for (const bg of BACKGROUNDS) {
      const ratio = contrast(color('--line-strong'), color(bg));
      expect(ratio, `--line-strong 在 ${bg} 上只有 ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(3);
    }
  });
});
