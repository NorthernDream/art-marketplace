import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// 项目是 ESM，没有 __dirname，用 import.meta.url 定位
const css = readFileSync(fileURLToPath(new URL('./tokens.css', import.meta.url)), 'utf8');

const COLOR_TOKENS = [
  '--paper', '--surface', '--ink', '--ink-2', '--ink-3',
  '--line', '--line-2', '--accent', '--accent-soft', '--wall', '--floor'
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
