import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 测试专用：把源码里的注释剥掉，只留会渲染给用户看的部分。
 *
 * 行注释只剥「整行都是注释」的那种（行首可有空白），不剥行尾注释。
 * 理由是失败方向：宽松的 `[^:]//` 写法会把同一行里 // 之后的内容全部吃掉，
 * 一旦某行既有 `//` 又有真正的违规文案，违规就被静默吞掉，那是 false PASS。
 * 只剥整行注释最坏退化成 false FAIL：会吵，但不会漏。守卫宁可吵也不能漏。
 */
export function stripComments(source: string): string {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]*\/\/[^\n]*$/gm, '');
}

/**
 * 测试专用：递归列出 dir 下所有匹配给定扩展名的源文件，`.test.ts` 一律排除
 * （测试代码本身不是用户可见的产物，不该被文案/死链守卫扫到）。
 *
 * copy.test.ts 与 nav.test.ts 原来各自维护一份这个函数，用的目录列表还不一样：
 * 前者扫 scripts，后者没扫——src/scripts/catalog-page.ts 恰恰是分面、卡片、
 * 空态这些 HTML 字符串拼出来的地方，href="#" 写在那里会直接绕过死链守卫。
 * 统一成一份、传同一份目录清单，这类分叉不会再悄悄出现。
 */
export function sourceFiles(dir: string, extensions: string[]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...sourceFiles(path, extensions));
    else if (extensions.some((ext) => name.endsWith(ext)) && !name.endsWith('.test.ts')) out.push(path);
  }
  return out;
}
