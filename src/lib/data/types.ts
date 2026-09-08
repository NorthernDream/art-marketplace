import type { PaletteName } from '../art/palettes';

export type Category = 'painting' | 'drawing' | 'print';

export type GeneratorName =
  | 'field' | 'gesture' | 'geometry' | 'line'
  | 'impasto' | 'wash' | 'drawing' | 'print';

export interface Artist {
  id: string;
  slug: string;
  name: string;
  country: string;
  city: string;
  joinedYear: number;
  /** 第三人称的画廊介绍：这个人是谁、从哪里来、怎么工作 */
  bio: string;
  /** 第一人称的创作自述：作品本身在讲什么。与 bio 是两种口吻，同屏出现 */
  statement: string;
  /** 展览经历，每条含年份，2–4 条 */
  exhibitions: string[];
  followers: number;
}

export interface Edition {
  n: number;
  of: number;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  category: Category;
  subject: string;
  style: string;
  medium: string;
  widthIn: number;
  heightIn: number;
  priceUsd: number;
  year: number;
  palette: PaletteName;
  generator: GeneratorName;
  /** null 表示孤品 */
  edition: Edition | null;
  /** 0–100，驱动"最受欢迎"排序与精选标记 */
  popularity: number;
  statement: string;
}
