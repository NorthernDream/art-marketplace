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
