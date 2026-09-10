export interface NavItem {
  label: string;
  href: string;
  /**
   * false 表示该目标页尚未建立，导航上标 Coming soon 并且不渲染成链接。
   * 主导航与页脚共用这一个标记，nav.test.ts 会对两处 live 的 href 逐个核对页面文件存在。
   */
  live: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', href: '/', live: true },
  { label: 'Paintings', href: '/paintings', live: true },
  { label: 'Drawings', href: '/drawings', live: true },
  { label: 'Prints', href: '/prints', live: true },
  { label: 'Photography', href: '/photography', live: false },
  { label: 'Sculpture', href: '/sculpture', live: false }
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'For Collectors',
    links: [
      { label: 'Art Advisory', href: '/art-advisory', live: false },
      { label: 'View in a Room', href: '/paintings', live: true },
      { label: 'Shipping & Returns', href: '/help', live: false },
      { label: 'Collections', href: '/paintings', live: true }
    ]
  },
  {
    title: 'Browse',
    links: [
      { label: 'Paintings', href: '/paintings', live: true },
      { label: 'Drawings', href: '/drawings', live: true },
      { label: 'Prints', href: '/prints', live: true }
    ]
  },
  {
    title: 'For Trade',
    links: [
      { label: 'Trade Programme', href: '/trade', live: false },
      { label: 'Hospitality', href: '/trade', live: false },
      { label: 'Bulk Enquiries', href: '/trade', live: false }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about', live: false },
      { label: 'Help Centre', href: '/help', live: false },
      { label: 'Contact', href: '/help', live: false }
    ]
  }
];

/**
 * 装饰性链接:视觉上保留、但当前没有落地页的入口。
 *
 * spec §12 的验收标准是「导航与页脚无死链(装饰性链接除外,并在功能清单中列明)」,
 * 这份清单就是那个功能清单。这些元素一律不渲染成 <a href="#">:头部的三个图标
 * 改成非链接的 <span>,装饰性的 <svg> 与可见文字各自 aria-hidden,另配一份
 * .sr-only 状态文本(如 "Sign In, coming soon"),让读屏用户拿到与视觉一致的
 * 信息;页脚三条法务链接改成非链接加可见的 Coming soon 标记。
 *
 * 对应阶段一旦建起页面,就从这份清单里删掉、改回真链接。
 */
export interface DecorativeLink {
  /** 出现在哪个组件（不含 .astro 后缀） */
  where: string;
  label: string;
  /** 由哪个阶段建起真正的落地页，见 spec §11 分期表 */
  plannedPhase: 3 | 4;
  why: string;
}

export const DECORATIVE_LINKS: DecorativeLink[] = [
  { where: 'SiteHeader', label: 'Sign In', plannedPhase: 3, why: '登录在 Phase 3 的 /signin' },
  { where: 'SiteHeader', label: 'Favorites', plannedPhase: 3, why: '收藏夹在 Phase 3 的 /favorites' },
  { where: 'SiteHeader', label: 'Cart', plannedPhase: 3, why: '购物车在 Phase 3 的 /cart' },
  { where: 'SiteFooter', label: 'Terms', plannedPhase: 4, why: '法务页在 Phase 4' },
  { where: 'SiteFooter', label: 'Privacy', plannedPhase: 4, why: '法务页在 Phase 4' },
  { where: 'SiteFooter', label: 'Cookies', plannedPhase: 4, why: '法务页在 Phase 4' }
];
