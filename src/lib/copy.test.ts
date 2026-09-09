import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { ARTISTS } from './data/artists';
import { ARTWORKS } from './data/artworks';
import { stripComments, sourceFiles } from './test-helpers';

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
    for (const dir of ['pages', 'components', 'layouts', 'scripts', 'lib']) {
      for (const file of sourceFiles(join(SRC, dir), ['.astro', '.ts'])) {
        stripComments(readFileSync(file, 'utf8')).split('\n').forEach((line, i) => {
          if (hasEmDash(line)) offenders.push(`${file.slice(SRC.length)}:${i + 1}  ${line.trim()}`);
        });
      }
    }
    expect(offenders, `以下文案含 em dash：\n${offenders.join('\n')}`).toEqual([]);
  });
});
