import { describe, it, expect } from 'vitest';
import { PRIMARY_NAV, FOOTER_COLUMNS, DECORATIVE_LINKS } from './nav';
import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';
import { stripComments } from './test-helpers';

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

const SRC = fileURLToPath(new URL('../', import.meta.url));

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...sourceFiles(path));
    else if (/\.astro$/.test(name)) out.push(path);
  }
  return out;
}

describe('装饰性链接', () => {
  /**
   * spec §12 的验收标准：导航与页脚无死链，装饰性链接除外且必须在功能清单中列明。
   * href="#" 是「看起来能点、点了什么都不发生」，它既不是真链接也没在任何地方
   * 交代过。本轮把这类元素一律改成非链接，并在 DECORATIVE_LINKS 里记账。
   */
  it('组件与页面里不存在 href="#" 死链', () => {
    const offenders: string[] = [];
    for (const dir of ['components', 'pages', 'layouts']) {
      for (const file of sourceFiles(join(SRC, dir))) {
        const body = stripComments(readFileSync(file, 'utf8'));
        if (body.includes('href="#"')) offenders.push(file.slice(SRC.length));
      }
    }
    expect(offenders, `以下文件仍有 href="#"：${offenders.join(', ')}`).toEqual([]);
  });

  it('清单非空，且每条都写明了出处、标签与归属阶段', () => {
    expect(DECORATIVE_LINKS.length).toBeGreaterThan(0);
    for (const d of DECORATIVE_LINKS) {
      expect(d.where.length, '缺少出处').toBeGreaterThan(0);
      expect(d.label.length, '缺少标签').toBeGreaterThan(0);
      expect([3, 4], `${d.label} 的归属阶段不合法`).toContain(d.plannedPhase);
    }
  });

  it('清单里的每条都能在它声明的组件里落地', () => {
    for (const d of DECORATIVE_LINKS) {
      const file = join(SRC, 'components', `${d.where}.astro`);
      expect(existsSync(file), `${d.where}.astro 不存在`).toBe(true);
      // 注释里出现不算数，所以先剥注释：否则把标签写进注释的组件也能过，
      // 那时守卫盯的是注释而不是渲染结果。
      const body = stripComments(readFileSync(file, 'utf8'));
      // 两种落地方式都算数：
      // 1) 标签字面写在标记里（SiteHeader 的三个图标）
      // 2) 组件消费 DECORATIVE_LINKS 自己渲染（SiteFooter 的三条法务链接）
      //    这种情况下标签必然与清单一致，因为它就是从清单取的。
      const literal = body.includes(d.label);
      const fromManifest = body.includes('DECORATIVE_LINKS');
      expect(
        literal || fromManifest,
        `${d.where}.astro 既没有字面量 ${d.label}，也没有消费 DECORATIVE_LINKS`
      ).toBe(true);
    }
  });
});
