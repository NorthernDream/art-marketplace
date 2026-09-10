// 艺术家页面用到的事实，全部从已有的作品数据算出来，不新增任何字段。
// 放在 lib 里而不是页面里，是为了能单独测——页面只负责把这些数字画出来。
import { ARTISTS, artistById } from './data/artists';
import { artworksByArtist } from './data/artworks';
import { buildCatalog, type CatalogItem } from './catalog';
import type { Artist } from './data/types';

export interface ArtistFacts {
  artist: Artist;
  /** 该艺术家的作品，按年份从新到旧 */
  works: CatalogItem[];
  workCount: number;
  /** 常用材质与题材，按出现次数从多到少 */
  mediums: string[];
  subjects: string[];
  priceLow: number;
  priceHigh: number;
  /** 在售作品的年份跨度 */
  earliestYear: number;
  latestYear: number;
}

/** 出现次数从多到少；同次数时按字母序，保证结果稳定 */
function byFrequency(values: string[]): string[] {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([v]) => v);
}

export function artistFacts(artistId: string): ArtistFacts | undefined {
  const artist = artistById(artistId);
  if (!artist) return undefined;

  const own = artworksByArtist(artistId);
  if (!own.length) return undefined;

  // 借 buildCatalog 补上 artistName / country，卡片组件要的是 CatalogItem
  const works = buildCatalog(own, ARTISTS).sort((a, b) => b.year - a.year);
  const prices = works.map((w) => w.priceUsd);
  const years = works.map((w) => w.year);

  return {
    artist,
    works,
    workCount: works.length,
    mediums: byFrequency(works.map((w) => w.medium)),
    subjects: byFrequency(works.map((w) => w.subject)),
    priceLow: Math.min(...prices),
    priceHigh: Math.max(...prices),
    earliestYear: Math.min(...years),
    latestYear: Math.max(...years)
  };
}

/** 目录里不重复的艺术家国别数。首页 hero 用它，不写死数字。 */
export function countryCount(): number {
  return new Set(ARTISTS.map((a) => a.country)).size;
}
