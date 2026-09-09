import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { ARTISTS } from './data/artists';
import { ARTWORKS } from './data/artworks';

// 项目是 ESM，没有 __dirname，用 import.meta.url 定位
const SRC = fileURLToPath(new URL('../', import.meta.url));

const EM_DASH = '—';

/**
 * em dash 在源码里有两副面孔：字面字符 — ，以及 HTML 实体 &mdash; / &#8212; / &#x2014;。
 * 两者渲染出来一模一样，只扫字面字符会漏掉实体形式（artwork/[slug].astro 就有一处）。
 */
const EM_DASH_ENTITY = /&mdash;|&#8212;|&#x2014;/i;

function hasEmDash(line: string): boolean {
  return line.includes(EM_DASH) || EM_DASH_ENTITY.test(line);
}

/**
 * 站点文案不使用 em dash：改用逗号、句号、冒号或括号。
 * 中文代码注释不是 UI 文案，扫描前先把注释剥掉。
 *
 * 行注释只剥「整行都是注释」的那种（行首可有空白），不剥行尾注释。
 * 理由是失败方向：宽松的 `[^:]//` 写法会把「同一行里 // 之后的所有内容」吃掉，
 * 一旦某行既有 `//` 又有真正的违规文案，违规就被静默吞掉，那是 false PASS。
 * 只剥整行注释最坏的结果是把行尾注释里的内容也算进来，那是 false FAIL，
 * 会吵，但不会漏。守卫宁可吵也不能漏。
 */
function stripComments(source: string): string {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]*\/\/[^\n]*$/gm, '');
}

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...sourceFiles(path));
    else if (/\.(astro|ts)$/.test(name) && !name.endsWith('.test.ts')) out.push(path);
  }
  return out;
}

describe('文案标点', () => {
  it('艺术家数据里没有 em dash', () => {
    for (const a of ARTISTS) {
      const fields: [string, string][] = [
        ['bio', a.bio],
        ['statement', a.statement],
        ...a.exhibitions.map((e, i): [string, string] => [`exhibitions[${i}]`, e])
      ];
      for (const [field, value] of fields) {
        expect(value.includes(EM_DASH), `${a.name} 的 ${field} 含 em dash：${value}`).toBe(false);
      }
    }
  });

  it('作品数据里没有 em dash', () => {
    for (const w of ARTWORKS) {
      expect(w.title.includes(EM_DASH), `${w.slug} 的标题含 em dash`).toBe(false);
      expect(w.statement.includes(EM_DASH), `${w.slug} 的自述含 em dash：${w.statement}`).toBe(false);
    }
  });

  it('页面、组件与脚本的文案里没有 em dash（含 HTML 实体，注释除外）', () => {
    const offenders: string[] = [];
    for (const dir of ['pages', 'components', 'layouts', 'scripts']) {
      for (const file of sourceFiles(join(SRC, dir))) {
        stripComments(readFileSync(file, 'utf8')).split('\n').forEach((line, i) => {
          if (hasEmDash(line)) offenders.push(`${file.slice(SRC.length)}:${i + 1}  ${line.trim()}`);
        });
      }
    }
    expect(offenders, `以下文案含 em dash：\n${offenders.join('\n')}`).toEqual([]);
  });
});
