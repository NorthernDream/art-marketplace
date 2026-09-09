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
