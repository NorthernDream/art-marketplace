import { describe, it, expect } from 'vitest';
import { PRIMARY_NAV, FOOTER_COLUMNS } from './nav';
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// 项目是 ESM，没有 __dirname，用 import.meta.url 定位
const PAGES_DIR = fileURLToPath(new URL('../pages/', import.meta.url));

describe('导航', () => {
  it('主导航包含三个已上线品类与首页', () => {
    const live = PRIMARY_NAV.filter(n => n.live).map(n => n.href);
    expect(live).toContain('/');
    expect(live).toContain('/paintings');
    expect(live).toContain('/drawings');
    expect(live).toContain('/prints');
  });

  it('摄影与雕塑标记为未上线', () => {
    for (const href of ['/photography', '/sculpture']) {
      const item = PRIMARY_NAV.find(n => n.href === href);
      expect(item, `${href} 不在主导航`).toBeTruthy();
      expect(item!.live).toBe(false);
    }
  });

  it('主导航中已上线的路由都有对应页面文件', () => {
    for (const item of PRIMARY_NAV.filter(n => n.live)) {
      const name = item.href === '/' ? 'index' : item.href.slice(1);
      expect(existsSync(resolve(PAGES_DIR, `${name}.astro`)), `缺少页面 ${item.href}`).toBe(true);
    }
  });

  it('页脚有四栏，每栏至少三个链接', () => {
    expect(FOOTER_COLUMNS.length).toBe(4);
    for (const col of FOOTER_COLUMNS) {
      expect(col.title.length).toBeGreaterThan(0);
      expect(col.links.length).toBeGreaterThanOrEqual(3);
    }
  });

  // nav 数据当初就是为了能这样核对才抽出来的，但这条只走了主导航。
  // 页脚才是链接最多的地方，同一份检查必须覆盖到，否则 /trade、/help、/about
  // 这类还没建的页面会一路 404 到演示现场。
  it('页脚里标为已上线的路由都有对应页面文件', () => {
    for (const col of FOOTER_COLUMNS) {
      for (const link of col.links.filter((l) => l.live)) {
        const name = link.href === '/' ? 'index' : link.href.slice(1);
        expect(existsSync(resolve(PAGES_DIR, `${name}.astro`)), `缺少页面 ${link.href}`).toBe(true);
      }
    }
  });

  it('页脚里没有对应页面的入口一律标成未上线（不渲染成链接）', () => {
    for (const col of FOOTER_COLUMNS) {
      for (const link of col.links) {
        const name = link.href === '/' ? 'index' : link.href.slice(1);
        const exists = existsSync(resolve(PAGES_DIR, `${name}.astro`));
        expect(link.live, `${link.label} → ${link.href} 的 live 标记与页面是否存在对不上`).toBe(exists);
      }
    }
  });

  it('pages 目录下确实存在 astro 页面', () => {
    expect(readdirSync(PAGES_DIR).some(f => f.endsWith('.astro'))).toBe(true);
  });
});
