// 120 件虚构作品数据：覆盖三大品类、40 位艺术家与全部调色板，供浏览页/详情页/推荐使用。
import type { Artwork } from './types';

export const ARTWORKS: Artwork[] = [
  // ---------- painting × 70 (w001–w070) ----------
  {
    id: 'w001', slug: 'slow-tide', title: 'Slow Tide', artistId: 'a01',
    category: 'painting', subject: 'Abstract', style: 'Color Field',
    medium: 'Oil on Canvas', widthIn: 48, heightIn: 36,
    priceUsd: 4200, year: 2025, palette: 'sea', generator: 'field',
    edition: null, popularity: 92,
    statement: 'Built up in thin glazes over four months, with the ground left bare along the lower edge so the linen still reads as cloth.'
  },
  {
    id: 'w002', slug: 'untitled-ochre-field', title: 'Untitled (Ochre Field)', artistId: 'a02',
    category: 'painting', subject: 'Abstract', style: 'Minimalism',
    medium: 'Oil on Linen', widthIn: 60, heightIn: 48,
    priceUsd: 9800, year: 2024, palette: 'ochre', generator: 'field',
    edition: null, popularity: 81,
    statement: 'One colour, mixed fresh each morning for eleven days, so the field holds eleven slightly different ochres that only separate in raking light.'
  },
  {
    id: 'w003', slug: 'doorway-at-noon', title: 'Doorway at Noon', artistId: 'a03',
    category: 'painting', subject: 'Interiors', style: 'Minimalism',
    medium: 'Acrylic on Canvas', widthIn: 30, heightIn: 40,
    priceUsd: 2100, year: 2023, palette: 'bone', generator: 'field',
    edition: null, popularity: 58,
    statement: 'Painted flat, with no visible brushwork, so the single doorway reads as a shape cut from plaster rather than a rendered space.'
  },
  {
    id: 'w004', slug: 'corner-unlit', title: 'Corner, Unlit', artistId: 'a03',
    category: 'painting', subject: 'Interiors', style: 'Contemporary',
    medium: 'Acrylic on Canvas', widthIn: 24, heightIn: 36,
    priceUsd: 1650, year: 2022, palette: 'ash', generator: 'geometry',
    edition: null, popularity: 51,
    statement: 'The room was measured before it was painted, and the perspective keeps that exactness even where the colour thins to almost nothing.'
  },
  {
    id: 'w005', slug: 'rotterdam-towpath-in-rain', title: 'Rotterdam Towpath in Rain', artistId: 'a04',
    category: 'painting', subject: 'Landscape', style: 'Impressionism',
    medium: 'Oil on Panel', widthIn: 13, heightIn: 10,
    priceUsd: 1200, year: 2024, palette: 'moss', generator: 'wash',
    edition: null, popularity: 62,
    statement: 'Finished outdoors in under two hours before the rain thickened, with the last passages scraped back rather than built up further.'
  },
  {
    id: 'w006', slug: 'gold-under-ink', title: 'Gold Under Ink', artistId: 'a05',
    category: 'painting', subject: 'Abstract', style: 'Abstract Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 40, heightIn: 64,
    priceUsd: 10500, year: 2025, palette: 'saffron', generator: 'gesture',
    edition: null, popularity: 79,
    statement: 'A ground of gold leaf was laid first and mostly buried under ink washes, so it only surfaces where the brush happened to skip.'
  },
  {
    id: 'w007', slug: 'seventh-gesture', title: 'Seventh Gesture', artistId: 'a05',
    category: 'painting', subject: 'Abstract', style: 'Abstract Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 44, heightIn: 56,
    priceUsd: 8500, year: 2024, palette: 'ember', generator: 'gesture',
    edition: null, popularity: 71,
    statement: 'Six earlier versions of this same arm movement were painted out before this one was allowed to stand; the cancelled marks show through as ridges.'
  },
  {
    id: 'w008', slug: 'kumasi-clay-study', title: 'Kumasi Clay Study', artistId: 'a06',
    category: 'painting', subject: 'Abstract', style: 'Color Field',
    medium: 'Mixed Media on Canvas', widthIn: 34, heightIn: 34,
    priceUsd: 3200, year: 2023, palette: 'ochre', generator: 'field',
    edition: null, popularity: 68,
    statement: 'The pigment was ground from clay and hearth ash exactly as his grandfather mixed dye, so the surface has the same slight grit under the hand.'
  },
  {
    id: 'w009', slug: 'ash-and-red-earth', title: 'Ash and Red Earth', artistId: 'a06',
    category: 'painting', subject: 'Abstract', style: 'Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 32, heightIn: 46,
    priceUsd: 4200, year: 2022, palette: 'ash', generator: 'impasto',
    edition: null, popularity: 55,
    statement: 'Laid on thickly enough that the paint cracked slightly while drying, a flaw he chose to leave rather than patch over.'
  },
  {
    id: 'w010', slug: 'mural-study-in-vermilion', title: 'Mural Study in Vermilion', artistId: 'a08',
    category: 'painting', subject: 'Figurative', style: 'Contemporary',
    medium: 'Acrylic on Canvas', widthIn: 64, heightIn: 48,
    priceUsd: 14500, year: 2025, palette: 'ember', generator: 'line',
    edition: null, popularity: 88,
    statement: 'Scaled up from a six-inch miniature sketch, the fine border patterns from that original drawing are kept at full size along one edge only.'
  },
  {
    id: 'w011', slug: 'oresund-january-i', title: 'Öresund, January I', artistId: 'a10',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 34, heightIn: 44,
    priceUsd: 3800, year: 2024, palette: 'sea', generator: 'wash',
    edition: null, popularity: 66,
    statement: "Painted from the same jetty as last winter's canvas, with the horizon line moved up half an inch to match this year's tide."
  },
  {
    id: 'w012', slug: 'oresund-january-ii', title: 'Öresund, January II', artistId: 'a10',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 34, heightIn: 26,
    priceUsd: 2900, year: 2025, palette: 'ultramarine', generator: 'wash',
    edition: null, popularity: 60,
    statement: 'The pale winter light lasted only forty minutes that afternoon, so the sky was blocked in fast and the foreground finished later from memory.'
  },
  {
    id: 'w013', slug: 'strait-in-grey-and-salt', title: 'Strait in Grey and Salt', artistId: 'a10',
    category: 'painting', subject: 'Seascape', style: 'Minimalism',
    medium: 'Oil on Canvas', widthIn: 18, heightIn: 18,
    priceUsd: 1750, year: 2022, palette: 'ash', generator: 'field',
    edition: null, popularity: 49,
    statement: 'A smaller, quicker canvas made between the larger January studies, kept deliberately loose at the edges where the ice usually forms.'
  },
  {
    id: 'w014', slug: 'salvador-market-in-collage', title: 'Salvador Market in Collage', artistId: 'a11',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 46, heightIn: 64,
    priceUsd: 12500, year: 2024, palette: 'ember', generator: 'impasto',
    edition: null, popularity: 74,
    statement: 'Paper cut from old market flyers is worked into the wet acrylic so the surface carries actual print alongside painted colour.'
  },
  {
    id: 'w015', slug: 'tropical-interior-no-4', title: 'Tropical Interior No. 4', artistId: 'a11',
    category: 'painting', subject: 'Interiors', style: 'Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 36, heightIn: 48,
    priceUsd: 6900, year: 2023, palette: 'rose', generator: 'gesture',
    edition: null, popularity: 63,
    statement: 'Fourth in a series that keeps the same room but changes what is growing through the window, this one dense with collaged leaves.'
  },
  {
    id: 'w016', slug: 'haifa-port-twenty-minutes', title: 'Haifa Port, Twenty Minutes', artistId: 'a12',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Acrylic on Canvas', widthIn: 14, heightIn: 11,
    priceUsd: 780, year: 2025, palette: 'sea', generator: 'wash',
    edition: null, popularity: 52,
    statement: 'Timed against the ferry schedule, this small study was stopped the moment the boat cleared the breakwater, unfinished by design.'
  },
  {
    id: 'w017', slug: 'crane-and-container', title: 'Crane and Container', artistId: 'a12',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Acrylic on Canvas', widthIn: 16, heightIn: 12,
    priceUsd: 850, year: 2024, palette: 'tide', generator: 'wash',
    edition: null, popularity: 47,
    statement: "One of a dozen small port studies made in a single week, chosen for the way the crane's shadow fell across the containers that morning."
  },
  {
    id: 'w018', slug: 'harbour-before-the-shift-change', title: 'Harbour Before the Shift Change', artistId: 'a12',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Acrylic on Canvas', widthIn: 18, heightIn: 14,
    priceUsd: 920, year: 2023, palette: 'ultramarine', generator: 'wash',
    edition: null, popularity: 44,
    statement: 'Painted in the last quiet minutes before the dock workers arrive, when the water is still and the colour has not yet been churned up.'
  },
  {
    id: 'w019', slug: 'fjord-in-grey-no-1', title: 'Fjord in Grey No. 1', artistId: 'a14',
    category: 'painting', subject: 'Landscape', style: 'Minimalism',
    medium: 'Oil on Canvas', widthIn: 44, heightIn: 54,
    priceUsd: 6200, year: 2022, palette: 'iron', generator: 'field',
    edition: null, popularity: 57,
    statement: 'After a decade painting fjords in full colour, she restricted the palette to grey alone; this canvas holds seven greys mixed from black and white only.'
  },
  {
    id: 'w020', slug: 'fjord-in-grey-no-2', title: 'Fjord in Grey No. 2', artistId: 'a14',
    category: 'painting', subject: 'Landscape', style: 'Minimalism',
    medium: 'Oil on Canvas', widthIn: 56, heightIn: 64,
    priceUsd: 10800, year: 2023, palette: 'ash', generator: 'field',
    edition: null, popularity: 61,
    statement: 'The mountain and its reflection are painted with the same brush without cleaning it, so one grey bleeds slightly into the other at the waterline.'
  },
  {
    id: 'w021', slug: 'quiet-water-bergen', title: 'Quiet Water, Bergen', artistId: 'a14',
    category: 'painting', subject: 'Landscape', style: 'Minimalism',
    medium: 'Oil on Canvas', widthIn: 34, heightIn: 56,
    priceUsd: 6800, year: 2024, palette: 'bone', generator: 'wash',
    edition: null, popularity: 53,
    statement: 'Made on an unusually still morning, the water needed almost no texture at all, just a long, even pull of the knife across pale grey.'
  },
  {
    id: 'w022', slug: 'narrow-frame-oaxaca', title: 'Narrow Frame, Oaxaca', artistId: 'a16',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 24, heightIn: 40,
    priceUsd: 5800, year: 2024, palette: 'ember', generator: 'gesture',
    edition: null, popularity: 84,
    statement: 'Fourteen figures are pressed into a canvas barely two feet wide, a crowding drawn from the muralist tradition he grew up around but never scaled to a wall himself.'
  },
  {
    id: 'w023', slug: 'crowd-with-one-gap', title: 'Crowd with One Gap', artistId: 'a16',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 30, heightIn: 44,
    priceUsd: 7600, year: 2023, palette: 'plum', generator: 'gesture',
    edition: null, popularity: 66,
    statement: 'Every face in the crowd is turned away except one, left as a pale unpainted oval where a face would otherwise go.'
  },
  {
    id: 'w024', slug: 'vendor-at-the-glass', title: 'Vendor at the Glass', artistId: 'a17',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 20, heightIn: 26,
    priceUsd: 2400, year: 2024, palette: 'saffron', generator: 'line',
    edition: null, popularity: 59,
    statement: "Painted in reverse order, background first and outline last, the technique she learned watching Dakar's sign painters work on glass shopfronts."
  },
  {
    id: 'w025', slug: 'market-woman-in-yellow', title: 'Market Woman in Yellow', artistId: 'a17',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 18, heightIn: 24,
    priceUsd: 2100, year: 2023, palette: 'ember', generator: 'line',
    edition: null, popularity: 54,
    statement: 'The reverse-glass method forces every mistake to be sanded back from the front, so the surface carries faint ghosts of two earlier faces.'
  },
  {
    id: 'w026', slug: 'stall-at-closing', title: 'Stall at Closing', artistId: 'a17',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 22, heightIn: 28,
    priceUsd: 2650, year: 2025, palette: 'rose', generator: 'line',
    edition: null, popularity: 61,
    statement: 'Made from a photograph taken at the end of market day, when the vendor was packing up rather than posing, which is why the pose reads as unguarded.'
  },
  {
    id: 'w027', slug: 'isfahan-tile-study', title: 'Isfahan Tile Study', artistId: 'a19',
    category: 'painting', subject: 'Abstract', style: 'Geometric',
    medium: 'Acrylic on Canvas', widthIn: 40, heightIn: 40,
    priceUsd: 6400, year: 2024, palette: 'saffron', generator: 'geometry',
    edition: null, popularity: 76,
    statement: 'The repeating star motif is drawn from a tile pattern she studied as an apprentice, scaled up until the geometry stops reading as ornament and starts reading as structure.'
  },
  {
    id: 'w028', slug: 'repeating-star-blue', title: 'Repeating Star, Blue', artistId: 'a19',
    category: 'painting', subject: 'Abstract', style: 'Geometric',
    medium: 'Acrylic on Canvas', widthIn: 48, heightIn: 64,
    priceUsd: 10500, year: 2023, palette: 'ultramarine', generator: 'geometry',
    edition: null, popularity: 69,
    statement: 'Each octagon in the grid was masked off and painted separately, a slow method she keeps despite knowing a stencil would be faster.'
  },
  {
    id: 'w029', slug: 'rooftops-from-the-balcony', title: 'Rooftops from the Balcony', artistId: 'a20',
    category: 'painting', subject: 'Architecture', style: 'Geometric',
    medium: 'Acrylic on Canvas', widthIn: 32, heightIn: 24,
    priceUsd: 2900, year: 2024, palette: 'ochre', generator: 'geometry',
    edition: null, popularity: 65,
    statement: 'Painted from the same balcony he sketched from as a child, the corrugated roofs are simplified to flat trapezoids of rust, ochre and grey.'
  },
  {
    id: 'w030', slug: 'johannesburg-rooftops-ii', title: 'Johannesburg Rooftops II', artistId: 'a20',
    category: 'painting', subject: 'Architecture', style: 'Geometric',
    medium: 'Acrylic on Canvas', widthIn: 36, heightIn: 26,
    priceUsd: 3300, year: 2025, palette: 'ember', generator: 'geometry',
    edition: null, popularity: 58,
    statement: 'A second version of the same view, flattened further this time until the perspective lines barely survive as a few pale diagonals.'
  },
  {
    id: 'w031', slug: 'peel-and-wax-paper', title: 'Peel and Wax Paper', artistId: 'a21',
    category: 'painting', subject: 'Still Life', style: 'Contemporary',
    medium: 'Oil on Panel', widthIn: 16, heightIn: 20,
    priceUsd: 3800, year: 2022, palette: 'bone', generator: 'wash',
    edition: null, popularity: 91,
    statement: 'Fifteen years into painting only kitchen scraps, this one holds a curl of orange peel and a torn sheet of wax paper, arranged exactly as they fell.'
  },
  {
    id: 'w032', slug: 'spent-matches-still-life', title: 'Spent Matches Still Life', artistId: 'a21',
    category: 'painting', subject: 'Still Life', style: 'Contemporary',
    medium: 'Oil on Panel', widthIn: 14, heightIn: 18,
    priceUsd: 3200, year: 2023, palette: 'ash', generator: 'wash',
    edition: null, popularity: 72,
    statement: 'Six spent matches, arranged and rearranged over a week until their charred ends made a shape she was satisfied with, then painted in one sitting.'
  },
  {
    id: 'w033', slug: 'balcony-in-red-and-violet', title: 'Balcony in Red and Violet', artistId: 'a22',
    category: 'painting', subject: 'Architecture', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 32, heightIn: 32,
    priceUsd: 4100, year: 2024, palette: 'plum', generator: 'gesture',
    edition: null, popularity: 63,
    statement: 'The saturated colour comes straight from the comic strips he read as a boy, outlines heavy enough that the railings read almost as panel borders.'
  },
  {
    id: 'w034', slug: 'stairwell-medellin', title: 'Stairwell, Medellín', artistId: 'a22',
    category: 'painting', subject: 'Architecture', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 24, heightIn: 34,
    priceUsd: 3600, year: 2023, palette: 'rose', generator: 'gesture',
    edition: null, popularity: 55,
    statement: 'A single stairwell painted from three different floors and combined into one impossible view, the colour pushed past what the light actually allowed.'
  },
  {
    id: 'w035', slug: 'sitter-by-the-north-window', title: 'Sitter by the North Window', artistId: 'a23',
    category: 'painting', subject: 'Figurative', style: 'Contemporary',
    medium: 'Oil on Canvas', widthIn: 34, heightIn: 56,
    priceUsd: 11500, year: 2024, palette: 'bone', generator: 'line',
    edition: null, popularity: 79,
    statement: "Painted over six unhurried sessions in the same north light, the sitter's hands were the last thing finished and the only part reworked twice."
  },
  {
    id: 'w036', slug: 'portrait-in-late-afternoon', title: 'Portrait in Late Afternoon', artistId: 'a23',
    category: 'painting', subject: 'Figurative', style: 'Contemporary',
    medium: 'Oil on Canvas', widthIn: 30, heightIn: 44,
    priceUsd: 9000, year: 2023, palette: 'ash', generator: 'line',
    edition: null, popularity: 71,
    statement: 'Trained at the Leipzig academy to work slowly, she kept this sitting to four hours only, which is why the background stayed a bare grey wash.'
  },
  {
    id: 'w037', slug: 'study-in-natural-light', title: 'Study in Natural Light', artistId: 'a23',
    category: 'painting', subject: 'Figurative', style: 'Contemporary',
    medium: 'Oil on Canvas', widthIn: 22, heightIn: 28,
    priceUsd: 5400, year: 2022, palette: 'moss', generator: 'line',
    edition: null, popularity: 60,
    statement: 'A preparatory study rather than a finished portrait, kept because the loose underpainting said more about the sitter than the tighter version that followed.'
  },
  {
    id: 'w038', slug: 'adire-field-i', title: 'Adire Field I', artistId: 'a25',
    category: 'painting', subject: 'Abstract', style: 'Color Field',
    medium: 'Mixed Media on Canvas', widthIn: 40, heightIn: 50,
    priceUsd: 6800, year: 2024, palette: 'ochre', generator: 'field',
    edition: null, popularity: 73,
    statement: "Layers of dyed fabric are pressed into wet pigment and later peeled away, leaving a resist pattern borrowed from Ibadan's adire cloth-dyers."
  },
  {
    id: 'w039', slug: 'adire-field-ii', title: 'Adire Field II', artistId: 'a25',
    category: 'painting', subject: 'Abstract', style: 'Abstract Expressionism',
    medium: 'Mixed Media on Canvas', widthIn: 44, heightIn: 64,
    priceUsd: 10200, year: 2023, palette: 'saffron', generator: 'impasto',
    edition: null, popularity: 67,
    statement: 'The second panel in the series uses a coarser fabric than the first, so the resist marks come out wider and less exact.'
  },
  {
    id: 'w040', slug: 'indigo-resist-study', title: 'Indigo Resist Study', artistId: 'a25',
    category: 'painting', subject: 'Abstract', style: 'Color Field',
    medium: 'Mixed Media on Canvas', widthIn: 24, heightIn: 30,
    priceUsd: 3900, year: 2022, palette: 'plum', generator: 'field',
    edition: null, popularity: 56,
    statement: 'A smaller trial piece made to test a new fabric before committing to the larger panels, kept for the accidental tear along the left edge.'
  },
  {
    id: 'w041', slug: 'tenement-stairwell-krakow', title: 'Tenement Stairwell, Kraków', artistId: 'a26',
    category: 'painting', subject: 'Interiors', style: 'Contemporary',
    medium: 'Oil on Canvas', widthIn: 24, heightIn: 36,
    priceUsd: 3100, year: 2024, palette: 'ash', generator: 'geometry',
    edition: null, popularity: 62,
    statement: 'Begun as an architecture-student measured drawing and only later painted, the perspective is still slightly too correct for a room this worn.'
  },
  {
    id: 'w042', slug: 'landing-third-floor', title: 'Landing, Third Floor', artistId: 'a26',
    category: 'painting', subject: 'Interiors', style: 'Contemporary',
    medium: 'Oil on Canvas', widthIn: 22, heightIn: 22,
    priceUsd: 2350, year: 2023, palette: 'bone', generator: 'geometry',
    edition: null, popularity: 50,
    statement: 'The peeling paint on the real stairwell wall is echoed by leaving the canvas ground visible in patches rather than covering it completely.'
  },
  {
    id: 'w043', slug: 'beirut-waterfront-revisited', title: 'Beirut Waterfront, Revisited', artistId: 'a27',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 64, heightIn: 44,
    priceUsd: 16000, year: 2024, palette: 'sea', generator: 'wash',
    edition: null, popularity: 89,
    statement: 'Painted from the same vantage point she has used for over a decade, this canvas records a skyline that has changed twice since her first version of the view.'
  },
  {
    id: 'w044', slug: 'waterfront-before-reconstruction', title: 'Waterfront Before Reconstruction', artistId: 'a27',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 46, heightIn: 36,
    priceUsd: 9500, year: 2022, palette: 'tide', generator: 'wash',
    edition: null, popularity: 74,
    statement: 'An earlier canvas in the ongoing waterfront series, kept in the studio rather than sold because it shows a crane dismantled the following spring.'
  },
  {
    id: 'w045', slug: 'harbour-lights-beirut', title: 'Harbour Lights, Beirut', artistId: 'a27',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 36, heightIn: 24,
    priceUsd: 6900, year: 2023, palette: 'ultramarine', generator: 'wash',
    edition: null, popularity: 68,
    statement: 'Painted at dusk over three consecutive evenings, the lights along the corniche were added last, each one a single loaded stroke of warm colour.'
  },
  {
    id: 'w046', slug: 'cordoba-hills-from-memory', title: 'Córdoba Hills from Memory', artistId: 'a29',
    category: 'painting', subject: 'Landscape', style: 'Color Field',
    medium: 'Oil on Canvas', widthIn: 34, heightIn: 26,
    priceUsd: 3400, year: 2024, palette: 'ochre', generator: 'field',
    edition: null, popularity: 64,
    statement: "Painted weeks after the trip that inspired it, entirely from memory, which is why the hill's true colour has drifted toward violet rather than the drier ochre it actually was."
  },
  {
    id: 'w047', slug: 'dry-season-cordoba', title: 'Dry Season, Córdoba', artistId: 'a29',
    category: 'painting', subject: 'Landscape', style: 'Color Field',
    medium: 'Oil on Canvas', widthIn: 30, heightIn: 22,
    priceUsd: 2800, year: 2023, palette: 'plum', generator: 'field',
    edition: null, popularity: 57,
    statement: 'Restricted, as always, to ochre and violet only, though this canvas leans harder into the violet than anything she has shown before.'
  },
  {
    id: 'w048', slug: 'hillside-study-no-9', title: 'Hillside Study No. 9', artistId: 'a29',
    category: 'painting', subject: 'Landscape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 20, heightIn: 16,
    priceUsd: 1900, year: 2022, palette: 'ochre', generator: 'wash',
    edition: null, popularity: 48,
    statement: 'Ninth in a numbered series of small hillside studies, none titled beyond their number, each a slightly different memory of the same drive home.'
  },
  {
    id: 'w049', slug: 'lake-victoria-dawn', title: 'Lake Victoria Dawn', artistId: 'a30',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 24, heightIn: 18,
    priceUsd: 1600, year: 2024, palette: 'saffron', generator: 'wash',
    edition: null, popularity: 60,
    statement: 'Painted start to finish before the sun cleared the far shore, a self-imposed limit that leaves the boats always slightly less finished than the water.'
  },
  {
    id: 'w050', slug: 'boats-before-the-light-changes', title: 'Boats Before the Light Changes', artistId: 'a30',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 22, heightIn: 16,
    priceUsd: 1450, year: 2023, palette: 'ember', generator: 'wash',
    edition: null, popularity: 52,
    statement: 'One of dozens of dawn canvases finished under the same time pressure, chosen for a reflection that came out unusually long and straight that morning.'
  },
  {
    id: 'w051', slug: 'kisumu-fleet-at-anchor', title: 'Kisumu Fleet at Anchor', artistId: 'a30',
    category: 'painting', subject: 'Seascape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 26, heightIn: 20,
    priceUsd: 1850, year: 2022, palette: 'moss', generator: 'wash',
    edition: null, popularity: 46,
    statement: 'Painted on a rare still morning when the boats had not yet gone out, so the usual rush against the light gave way to unfamiliar patience.'
  },
  {
    id: 'w052', slug: 'ghent-canal-after-twenty-years', title: 'Ghent Canal After Twenty Years', artistId: 'a33',
    category: 'painting', subject: 'Landscape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 72, heightIn: 48,
    priceUsd: 22000, year: 2025, palette: 'sea', generator: 'wash',
    edition: null, popularity: 94,
    statement: 'Two decades into painting the same stretch of water, this is the largest canvas she has allowed herself, the horizon held at exactly the height it was in the first.'
  },
  {
    id: 'w053', slug: 'canal-in-october-light', title: 'Canal in October Light', artistId: 'a33',
    category: 'painting', subject: 'Landscape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 44, heightIn: 50,
    priceUsd: 10500, year: 2023, palette: 'ultramarine', generator: 'wash',
    edition: null, popularity: 77,
    statement: 'The same canal in autumn rather than the summer light she usually paints, kept because the reflections came out colder than expected.'
  },
  {
    id: 'w054', slug: 'moored-barge-ghent', title: 'Moored Barge, Ghent', artistId: 'a33',
    category: 'painting', subject: 'Landscape', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 34, heightIn: 26,
    priceUsd: 7400, year: 2022, palette: 'tide', generator: 'wash',
    edition: null, popularity: 69,
    statement: 'A barge moored in the same spot for years appears here as it has in a dozen earlier canvases, always a little differently weathered each time.'
  },
  {
    id: 'w055', slug: 'accra-trader-in-red', title: 'Accra Trader in Red', artistId: 'a34',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 24, heightIn: 32,
    priceUsd: 2900, year: 2024, palette: 'ember', generator: 'gesture',
    edition: null, popularity: 66,
    statement: 'Blocked in on the street in under an hour, then finished later in the studio from a phone photograph for the details he had no time to catch live.'
  },
  {
    id: 'w056', slug: 'market-trader-portrait-ii', title: 'Market Trader Portrait II', artistId: 'a34',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 20, heightIn: 26,
    priceUsd: 2300, year: 2023, palette: 'rose', generator: 'gesture',
    edition: null, popularity: 54,
    statement: 'The bold outline is laid down first and fast, with the acrylic colour filled in afterward, often in a completely different session.'
  },
  {
    id: 'w057', slug: 'trader-with-scales', title: 'Trader with Scales', artistId: 'a34',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 22, heightIn: 28,
    priceUsd: 2600, year: 2025, palette: 'saffron', generator: 'gesture',
    edition: null, popularity: 58,
    statement: 'Painted from a trader he has sketched several times before, this version keeps the scales prominent in a way the earlier ones did not.'
  },
  {
    id: 'w058', slug: 'facade-slated-for-demolition', title: 'Facade Slated for Demolition', artistId: 'a35',
    category: 'painting', subject: 'Architecture', style: 'Contemporary',
    medium: 'Mixed Media on Canvas', widthIn: 30, heightIn: 44,
    priceUsd: 3600, year: 2024, palette: 'ochre', generator: 'wash',
    edition: null, popularity: 63,
    statement: 'Documented before the building came down, the loose, washy handling keeps the fragile, temporary quality the facade itself had.'
  },
  {
    id: 'w059', slug: 'balcony-grille-alexandria', title: 'Balcony Grille, Alexandria', artistId: 'a35',
    category: 'painting', subject: 'Architecture', style: 'Contemporary',
    medium: 'Mixed Media on Canvas', widthIn: 22, heightIn: 30,
    priceUsd: 2200, year: 2023, palette: 'bone', generator: 'wash',
    edition: null, popularity: 51,
    statement: 'The ironwork grille is the only element painted with any precision; everything around it is left deliberately loose, a building already half gone.'
  },
  {
    id: 'w060', slug: 'shuttered-shopfront', title: 'Shuttered Shopfront', artistId: 'a35',
    category: 'painting', subject: 'Architecture', style: 'Contemporary',
    medium: 'Mixed Media on Canvas', widthIn: 24, heightIn: 32,
    priceUsd: 2450, year: 2022, palette: 'saffron', generator: 'wash',
    edition: null, popularity: 47,
    statement: 'Painted from a photograph taken the week the shop closed, the loose washed colour standing in for a facade she never saw fully lit.'
  },
  {
    id: 'w061', slug: 'stairwell-facing-demolition', title: 'Stairwell Facing Demolition', artistId: 'a35',
    category: 'painting', subject: 'Architecture', style: 'Contemporary',
    medium: 'Mixed Media on Canvas', widthIn: 28, heightIn: 36,
    priceUsd: 2950, year: 2025, palette: 'ember', generator: 'wash',
    edition: null, popularity: 55,
    statement: 'One of the last buildings she documented before the block was cleared, painted quickly from a single visit rather than the usual several.'
  },
  {
    id: 'w062', slug: 'matatu-at-rush-hour', title: 'Matatu at Rush Hour', artistId: 'a37',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 26, heightIn: 20,
    priceUsd: 1950, year: 2024, palette: 'ember', generator: 'gesture',
    edition: null, popularity: 59,
    statement: 'Painted from sketches made on her own commute, the gestural strokes follow the jolt of the matatu rather than any posed stillness.'
  },
  {
    id: 'w063', slug: 'nairobi-commute-no-3', title: 'Nairobi Commute No. 3', artistId: 'a37',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 24, heightIn: 18,
    priceUsd: 1700, year: 2023, palette: 'plum', generator: 'gesture',
    edition: null, popularity: 50,
    statement: 'Third in a series painted directly from memory the same evening as the ride, before the specifics of who was sitting where could fade.'
  },
  {
    id: 'w064', slug: 'standing-room-only', title: 'Standing Room Only', artistId: 'a37',
    category: 'painting', subject: 'Figurative', style: 'Expressionism',
    medium: 'Acrylic on Canvas', widthIn: 22, heightIn: 16,
    priceUsd: 1550, year: 2022, palette: 'rose', generator: 'gesture',
    edition: null, popularity: 44,
    statement: 'The crowded composition came from a morning when the matatu was too full to sketch properly, so the shapes are reconstructed rather than observed directly.'
  },
  {
    id: 'w065', slug: 'seville-courtyard-at-noon', title: 'Seville Courtyard at Noon', artistId: 'a38',
    category: 'painting', subject: 'Architecture', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 44, heightIn: 38,
    priceUsd: 8500, year: 2024, palette: 'sea', generator: 'field',
    edition: null, popularity: 76,
    statement: 'Held to the midday constraint he set himself years ago, when the shadows are shortest and the courtyard tiles read almost as flat colour.'
  },
  {
    id: 'w066', slug: 'orange-tree-courtyard', title: 'Orange Tree Courtyard', artistId: 'a38',
    category: 'painting', subject: 'Botanical', style: 'Impressionism',
    medium: 'Oil on Canvas', widthIn: 42, heightIn: 34,
    priceUsd: 7200, year: 2023, palette: 'ember', generator: 'field',
    edition: null, popularity: 65,
    statement: "The tree's shadow at noon is barely a shadow at all, just a dark collar around its own trunk, which is the whole reason he painted it then."
  },
  {
    id: 'w067', slug: 'tiled-courtyard-in-white', title: 'Tiled Courtyard in White', artistId: 'a38',
    category: 'painting', subject: 'Architecture', style: 'Minimalism',
    medium: 'Oil on Canvas', widthIn: 28, heightIn: 22,
    priceUsd: 5200, year: 2022, palette: 'bone', generator: 'field',
    edition: null, popularity: 61,
    statement: 'Nearly all white by design, since at noon the tiles bounce so much light back that colour becomes almost impossible to see accurately.'
  },
  {
    id: 'w068', slug: 'container-stack-busan', title: 'Container Stack, Busan', artistId: 'a39',
    category: 'painting', subject: 'Abstract', style: 'Color Field',
    medium: 'Mixed Media on Canvas', widthIn: 44, heightIn: 46,
    priceUsd: 7500, year: 2024, palette: 'ember', generator: 'field',
    edition: null, popularity: 70,
    statement: 'Each band of colour is mixed to match a shipping-container hue he photographed at the docks, the pigment ground by hand until the match was close enough.'
  },
  {
    id: 'w069', slug: 'dock-colours-no-6', title: 'Dock Colours No. 6', artistId: 'a39',
    category: 'painting', subject: 'Abstract', style: 'Color Field',
    medium: 'Mixed Media on Canvas', widthIn: 40, heightIn: 42,
    priceUsd: 6000, year: 2023, palette: 'plum', generator: 'field',
    edition: null, popularity: 62,
    statement: 'Sixth in an ongoing catalogue of container colours, this one mixed from a violet crate he has still not managed to find twice.'
  },
  {
    id: 'w070', slug: 'busan-harbour-blocks', title: 'Busan Harbour Blocks', artistId: 'a39',
    category: 'painting', subject: 'Abstract', style: 'Geometric',
    medium: 'Mixed Media on Canvas', widthIn: 32, heightIn: 24,
    priceUsd: 4200, year: 2022, palette: 'ultramarine', generator: 'geometry',
    edition: null, popularity: 54,
    statement: 'The stacked rectangles are arranged exactly as the containers stood that week at the dock, before the crane came and rearranged them entirely.'
  },

  // ---------- drawing × 25 (w071–w095) ----------
  {
    id: 'w071', slug: 'nine-studies-for-a-hand', title: 'Nine Studies for a Hand', artistId: 'a11',
    category: 'drawing', subject: 'Figurative', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 780, year: 2025, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 64,
    statement: "Drawn in a single sitting from the artist's own left hand, with the earlier attempts left visible under the erasure rather than cleaned away."
  },
  {
    id: 'w072', slug: 'towpath-sketch-before-the-rain', title: 'Towpath Sketch Before the Rain', artistId: 'a04',
    category: 'drawing', subject: 'Landscape', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 11, heightIn: 14,
    priceUsd: 420, year: 2024, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 41,
    statement: 'Made in the ten minutes before the rain that later interrupted the companion painting, held onto since as the more honest of the two.'
  },
  {
    id: 'w073', slug: 'izmir-coast-from-memory', title: 'İzmir Coast from Memory', artistId: 'a07',
    category: 'drawing', subject: 'Seascape', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 13, heightIn: 10,
    priceUsd: 420, year: 2023, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 45,
    statement: 'Drawn entirely from memory rather than observation, the coastline drifts into something closer to a map than a view, cliffs marked more by note than by likeness.'
  },
  {
    id: 'w074', slug: 'aegean-cliffs-no-2', title: 'Aegean Cliffs No. 2', artistId: 'a07',
    category: 'drawing', subject: 'Seascape', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 18, heightIn: 14,
    priceUsd: 560, year: 2024, palette: 'sanguine', generator: 'drawing',
    edition: null, popularity: 39,
    statement: 'A looser second pass at the same stretch of coastline, the harbour reduced to a few marks that only resolve into buildings from a distance.'
  },
  {
    id: 'w075', slug: 'preparatory-study-for-a-mural', title: 'Preparatory Study for a Mural', artistId: 'a08',
    category: 'drawing', subject: 'Figurative', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 1200, year: 2024, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 68,
    statement: 'Kept from the folder of studies that preceded the finished mural-scale canvas, this sheet still carries the fine miniature-trained line she later scales up.'
  },
  {
    id: 'w076', slug: 'factory-window-pecs', title: 'Factory Window, Pécs', artistId: 'a18',
    category: 'drawing', subject: 'Architecture', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 22, heightIn: 30,
    priceUsd: 1050, year: 2024, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 56,
    statement: 'Drawn on site with the paper pinned directly to the factory wall, so the charcoal picked up the texture of the brick underneath in places.'
  },
  {
    id: 'w077', slug: 'abandoned-boiler-room', title: 'Abandoned Boiler Room', artistId: 'a18',
    category: 'drawing', subject: 'Interiors', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 20, heightIn: 26,
    priceUsd: 590, year: 2023, palette: 'sanguine', generator: 'drawing',
    edition: null, popularity: 48,
    statement: 'The boiler itself is barely indicated; most of the sheet is given over to the pipework above it, drawn in a tangle of overlapping lines.'
  },
  {
    id: 'w078', slug: 'stairwell-pecs-factory', title: 'Stairwell, Pécs Factory', artistId: 'a18',
    category: 'drawing', subject: 'Architecture', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 550, year: 2022, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 43,
    statement: 'One of a series drawn across a single abandoned complex, this sheet took an afternoon and was finished before the light through the broken roof shifted.'
  },
  {
    id: 'w079', slug: 'charcoal-study-of-a-peel', title: 'Charcoal Study of a Peel', artistId: 'a21',
    category: 'drawing', subject: 'Still Life', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 12, heightIn: 16,
    priceUsd: 620, year: 2024, palette: 'sanguine', generator: 'drawing',
    edition: null, popularity: 60,
    statement: "A charcoal study made ahead of the painted version, kept afterward because the peel's curl came out more convincingly here than in the oil."
  },
  {
    id: 'w080', slug: 'shiraz-rose-garden-i', title: 'Shiraz Rose Garden I', artistId: 'a24',
    category: 'drawing', subject: 'Botanical', style: 'Contemporary',
    medium: 'Conté on Paper', widthIn: 9, heightIn: 12,
    priceUsd: 340, year: 2024, palette: 'sanguine', generator: 'drawing',
    edition: null, popularity: 42,
    statement: 'Small enough to hold in one hand, a habit kept from years spent drawing on trains and in waiting rooms rather than at a fixed desk.'
  },
  {
    id: 'w081', slug: 'rose-garden-in-conte', title: 'Rose Garden in Conté', artistId: 'a24',
    category: 'drawing', subject: 'Botanical', style: 'Contemporary',
    medium: 'Conté on Paper', widthIn: 10, heightIn: 14,
    priceUsd: 380, year: 2023, palette: 'sanguine', generator: 'drawing',
    edition: null, popularity: 38,
    statement: 'The warm red-brown of the conté crayon does most of the work here, laid down in short repeated strokes that build the petals without any outline at all.'
  },
  {
    id: 'w082', slug: 'garden-wall-shiraz', title: 'Garden Wall, Shiraz', artistId: 'a24',
    category: 'drawing', subject: 'Botanical', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 11, heightIn: 14,
    priceUsd: 360, year: 2022, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 35,
    statement: 'Roses climbing a garden wall, drawn small and quickly on a single afternoon, the wall itself barely more than a few guiding lines.'
  },
  {
    id: 'w083', slug: 'north-sea-ferry-study', title: 'North Sea Ferry Study', artistId: 'a28',
    category: 'drawing', subject: 'Seascape', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 20, heightIn: 14,
    priceUsd: 720, year: 2024, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 62,
    statement: 'Built from dozens of thin, overlapping lines rather than a single contour, so the hull only reads as solid from a normal viewing distance.'
  },
  {
    id: 'w084', slug: 'ferry-departing-aarhus', title: 'Ferry Departing Aarhus', artistId: 'a28',
    category: 'drawing', subject: 'Seascape', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 22, heightIn: 16,
    priceUsd: 780, year: 2023, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 55,
    statement: 'The wake is the densest part of the drawing, built up from far more overlapping lines than the ferry itself required.'
  },
  {
    id: 'w085', slug: 'ferry-in-fog', title: 'Ferry in Fog', artistId: 'a28',
    category: 'drawing', subject: 'Seascape', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 18, heightIn: 13,
    priceUsd: 690, year: 2022, palette: 'iron', generator: 'drawing',
    edition: null, popularity: 47,
    statement: 'Drawn from a crossing where the ferry ahead was barely visible, so most of the sheet stays empty and the few lines that exist carry all the weight.'
  },
  {
    id: 'w086', slug: 'canal-study-in-charcoal', title: 'Canal Study in Charcoal', artistId: 'a33',
    category: 'drawing', subject: 'Landscape', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 16, heightIn: 12,
    priceUsd: 1400, year: 2024, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 58,
    statement: 'One of the rare charcoal studies among two decades of oil paintings of the same canal, made on a day she left her paints at home.'
  },
  {
    id: 'w087', slug: 'split-alley-in-crosshatch', title: 'Split Alley in Crosshatch', artistId: 'a36',
    category: 'drawing', subject: 'Architecture', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 14, heightIn: 20,
    priceUsd: 610, year: 2024, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 53,
    statement: 'The dense cross-hatching is a technique inherited from an uncle who restored old manuscripts, applied here to the stone alleys of Split instead of parchment.'
  },
  {
    id: 'w088', slug: 'stone-steps-split', title: 'Stone Steps, Split', artistId: 'a36',
    category: 'drawing', subject: 'Architecture', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 16, heightIn: 22,
    priceUsd: 660, year: 2023, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 46,
    statement: 'Every stone in the stairway is hatched individually rather than in a single sweep, a slowness that shows in how long the shadows took to build.'
  },
  {
    id: 'w089', slug: 'alley-in-late-light', title: 'Alley in Late Light', artistId: 'a36',
    category: 'drawing', subject: 'Architecture', style: 'Contemporary',
    medium: 'Conté on Paper', widthIn: 12, heightIn: 18,
    priceUsd: 540, year: 2022, palette: 'sanguine', generator: 'drawing',
    edition: null, popularity: 40,
    statement: 'Switched to conté for this one instead of his usual graphite, chasing a warmer shadow than the cross-hatched line work usually allows.'
  },
  {
    id: 'w090', slug: 'doorway-in-split', title: 'Doorway in Split', artistId: 'a36',
    category: 'drawing', subject: 'Architecture', style: 'Contemporary',
    medium: 'Graphite on Paper', widthIn: 15, heightIn: 21,
    priceUsd: 600, year: 2025, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 44,
    statement: 'A single doorway built from thousands of short hatched lines, a method slow enough that only a few sheets like it are finished in any given month.'
  },
  {
    id: 'w091', slug: 'commute-sketch-nairobi', title: 'Commute Sketch, Nairobi', artistId: 'a37',
    category: 'drawing', subject: 'Figurative', style: 'Contemporary',
    medium: 'Charcoal on Paper', widthIn: 12, heightIn: 9,
    priceUsd: 390, year: 2024, palette: 'sanguine', generator: 'drawing',
    edition: null, popularity: 37,
    statement: 'Drawn on the matatu itself, balanced on one knee, which is why the lines here are looser than anything she manages back in the studio.'
  },
  {
    id: 'w092', slug: 'brno-functionalist-facade', title: 'Brno Functionalist Facade', artistId: 'a40',
    category: 'drawing', subject: 'Architecture', style: 'Minimalism',
    medium: 'Graphite on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 1150, year: 2024, palette: 'graphite', generator: 'drawing',
    edition: null, popularity: 65,
    statement: 'Treated the way she treats every building she draws, as a portrait of its era rather than a likeness, the fine line kept even and unbroken throughout.'
  },
  {
    id: 'w093', slug: 'stairwell-window-brno', title: 'Stairwell Window, Brno', artistId: 'a40',
    category: 'drawing', subject: 'Architecture', style: 'Minimalism',
    medium: 'Graphite on Paper', widthIn: 16, heightIn: 22,
    priceUsd: 760, year: 2023, palette: 'iron', generator: 'drawing',
    edition: null, popularity: 51,
    statement: "The window's steel frame is drawn with a ruler for the first time in this series; everything else in the sheet is kept freehand."
  },
  {
    id: 'w094', slug: 'apartment-block-elevation', title: 'Apartment Block Elevation', artistId: 'a40',
    category: 'drawing', subject: 'Architecture', style: 'Minimalism',
    medium: 'Graphite on Paper', widthIn: 20, heightIn: 28,
    priceUsd: 890, year: 2022, palette: 'iron', generator: 'drawing',
    edition: null, popularity: 49,
    statement: 'A full elevation rather than her usual cropped detail, drawn flat and to scale the way an architect would rather than the way a passerby would see it.'
  },
  {
    id: 'w095', slug: 'functionalist-corner-block', title: 'Functionalist Corner Block', artistId: 'a40',
    category: 'drawing', subject: 'Architecture', style: 'Minimalism',
    medium: 'Graphite on Paper', widthIn: 22, heightIn: 30,
    priceUsd: 950, year: 2025, palette: 'bone', generator: 'drawing',
    edition: null, popularity: 57,
    statement: 'A corner building drawn from two elevations joined at the edge of the sheet, a trick she uses when a single facade will not hold enough of the story.'
  },

  // ---------- print × 25 (w096–w120) ----------
  {
    id: 'w096', slug: 'harbour-in-four-colours', title: 'Harbour in Four Colours', artistId: 'a19',
    category: 'print', subject: 'Seascape', style: 'Geometric',
    medium: 'Screenprint on Paper', widthIn: 24, heightIn: 18,
    priceUsd: 620, year: 2024, palette: 'tide', generator: 'print',
    edition: { n: 7, of: 40 }, popularity: 58,
    statement: 'Four screens pulled by hand, deliberately registered a hair out of true so each colour shows a sliver of the one beneath it.'
  },
  {
    id: 'w097', slug: 'amman-facade-study-i', title: 'Amman Facade Study I', artistId: 'a09',
    category: 'print', subject: 'Architecture', style: 'Geometric',
    medium: 'Linocut on Paper', widthIn: 16, heightIn: 20,
    priceUsd: 1050, year: 2024, palette: 'bone', generator: 'print',
    edition: { n: 12, of: 30 }, popularity: 55,
    statement: 'Cut by hand from an architectural photograph of an Amman facade, the block gouged deep enough that the grain of the wood shows through the pale stone tone.'
  },
  {
    id: 'w098', slug: 'amman-facade-study-ii', title: 'Amman Facade Study II', artistId: 'a09',
    category: 'print', subject: 'Architecture', style: 'Geometric',
    medium: 'Linocut on Paper', widthIn: 18, heightIn: 22,
    priceUsd: 540, year: 2023, palette: 'ochre', generator: 'print',
    edition: { n: 20, of: 30 }, popularity: 49,
    statement: 'A second cut of the same facade, this time inked in a warmer tone to see how the geometry read against sand rather than stone.'
  },
  {
    id: 'w099', slug: 'stone-lattice-amman', title: 'Stone Lattice, Amman', artistId: 'a09',
    category: 'print', subject: 'Architecture', style: 'Geometric',
    medium: 'Linocut on Paper', widthIn: 20, heightIn: 20,
    priceUsd: 580, year: 2025, palette: 'iron', generator: 'print',
    edition: { n: 8, of: 25 }, popularity: 60,
    statement: 'The mashrabiya lattice pattern took three separate blocks to cut cleanly, each tested on scrap paper a dozen times before the edition was pulled.'
  },
  {
    id: 'w100', slug: 'lagos-market-in-woodcut', title: 'Lagos Market in Woodcut', artistId: 'a13',
    category: 'print', subject: 'Still Life', style: 'Expressionism',
    medium: 'Woodcut on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 420, year: 2024, palette: 'rose', generator: 'print',
    edition: { n: 5, of: 20 }, popularity: 88,
    statement: 'Each impression in this small run varies slightly by hand-inked pressure, so no two prints of the market stalls carry quite the same weight of colour.'
  },
  {
    id: 'w101', slug: 'woodcut-of-a-fish-stall', title: 'Woodcut of a Fish Stall', artistId: 'a13',
    category: 'print', subject: 'Still Life', style: 'Expressionism',
    medium: 'Woodcut on Paper', widthIn: 12, heightIn: 14,
    priceUsd: 350, year: 2023, palette: 'plum', generator: 'print',
    edition: { n: 11, of: 20 }, popularity: 46,
    statement: 'Printed in a run of twenty, this one was pulled with heavier pressure than most, so the fish scales come out almost solid black rather than textured.'
  },
  {
    id: 'w102', slug: 'market-awnings-lagos', title: 'Market Awnings, Lagos', artistId: 'a13',
    category: 'print', subject: 'Architecture', style: 'Expressionism',
    medium: 'Woodcut on Paper', widthIn: 20, heightIn: 26,
    priceUsd: 460, year: 2025, palette: 'saffron', generator: 'print',
    edition: { n: 14, of: 20 }, popularity: 51,
    statement: 'The awnings are the only element carved with any fine detail; the crowd beneath them is left as a few broad gouges standing in for bodies.'
  },
  {
    id: 'w103', slug: 'kyoto-garden-reduction-i', title: 'Kyoto Garden Reduction I', artistId: 'a15',
    category: 'print', subject: 'Botanical', style: 'Minimalism',
    medium: 'Woodcut on Paper', widthIn: 14, heightIn: 18,
    priceUsd: 1350, year: 2024, palette: 'moss', generator: 'print',
    edition: { n: 4, of: 12 }, popularity: 63,
    statement: 'Made using a reduction method that destroys the block after each colour, so this edition of twelve can never be reprinted even by the artist herself.'
  },
  {
    id: 'w104', slug: 'kyoto-garden-reduction-ii', title: 'Kyoto Garden Reduction II', artistId: 'a15',
    category: 'print', subject: 'Botanical', style: 'Minimalism',
    medium: 'Woodcut on Paper', widthIn: 16, heightIn: 20,
    priceUsd: 780, year: 2023, palette: 'sea', generator: 'print',
    edition: { n: 9, of: 12 }, popularity: 57,
    statement: 'The pond in this second reduction print holds four separate colour passes, each one carved away irrevocably before the next was printed.'
  },
  {
    id: 'w105', slug: 'moss-garden-study', title: 'Moss Garden Study', artistId: 'a15',
    category: 'print', subject: 'Botanical', style: 'Minimalism',
    medium: 'Woodcut on Paper', widthIn: 12, heightIn: 16,
    priceUsd: 640, year: 2025, palette: 'tide', generator: 'print',
    edition: { n: 6, of: 12 }, popularity: 52,
    statement: 'Kept to her usual small edition of twelve, apprenticed technique intact, though this block was cut with a finer gouge than her earlier prints.'
  },
  {
    id: 'w106', slug: 'muralists-notebook-page', title: "Muralist's Notebook Page", artistId: 'a16',
    category: 'print', subject: 'Figurative', style: 'Expressionism',
    medium: 'Screenprint on Paper', widthIn: 20, heightIn: 26,
    priceUsd: 680, year: 2024, palette: 'plum', generator: 'print',
    edition: { n: 18, of: 40 }, popularity: 61,
    statement: 'Adapted from a page of mural sketches into a flat screenprint, the crowding of figures that defines his canvases translated here into layered, overlapping screens.'
  },
  {
    id: 'w107', slug: 'rooftop-grid-screenprint', title: 'Rooftop Grid Screenprint', artistId: 'a20',
    category: 'print', subject: 'Architecture', style: 'Geometric',
    medium: 'Screenprint on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 520, year: 2024, palette: 'rose', generator: 'print',
    edition: { n: 22, of: 50 }, popularity: 54,
    statement: 'Simplifies the township rooftops down to a flat grid of trapezoids, a version of the composition that reads almost as a textile pattern at a distance.'
  },
  {
    id: 'w108', slug: 'balcony-poster-medellin', title: 'Balcony Poster, Medellín', artistId: 'a22',
    category: 'print', subject: 'Architecture', style: 'Geometric',
    medium: 'Screenprint on Paper', widthIn: 20, heightIn: 28,
    priceUsd: 590, year: 2025, palette: 'rose', generator: 'print',
    edition: { n: 15, of: 40 }, popularity: 49,
    statement: 'Pushed the saturated comic-strip colour of his paintings even flatter for the screens, since the print process cannot hold the same gestural edge.'
  },
  {
    id: 'w109', slug: 'stairwell-linocut', title: 'Stairwell Linocut', artistId: 'a26',
    category: 'print', subject: 'Interiors', style: 'Contemporary',
    medium: 'Linocut on Paper', widthIn: 16, heightIn: 22,
    priceUsd: 470, year: 2023, palette: 'moss', generator: 'print',
    edition: { n: 19, of: 30 }, popularity: 45,
    statement: "The measured perspective from her painted stairwells survives the cut, though the linocut's blunter line loses some of the plaster's original softness."
  },
  {
    id: 'w110', slug: 'ink-wash-on-screen-i', title: 'Ink Wash on Screen I', artistId: 'a31',
    category: 'print', subject: 'Abstract', style: 'Contemporary',
    medium: 'Screenprint on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 690, year: 2024, palette: 'sea', generator: 'print',
    edition: { n: 10, of: 35 }, popularity: 59,
    statement: 'Scans of an ink wash painted on rice paper were separated into four screens, keeping the softness of the brush inside an otherwise mechanical process.'
  },
  {
    id: 'w111', slug: 'ink-wash-on-screen-ii', title: 'Ink Wash on Screen II', artistId: 'a31',
    category: 'print', subject: 'Abstract', style: 'Contemporary',
    medium: 'Screenprint on Paper', widthIn: 20, heightIn: 26,
    priceUsd: 740, year: 2023, palette: 'tide', generator: 'print',
    edition: { n: 16, of: 35 }, popularity: 53,
    statement: 'A second pass through the same digital-collage process, this time letting the registration slip slightly on purpose between the ink layers.'
  },
  {
    id: 'w112', slug: 'rice-paper-composite', title: 'Rice Paper Composite', artistId: 'a31',
    category: 'print', subject: 'Abstract', style: 'Contemporary',
    medium: 'Screenprint on Paper', widthIn: 16, heightIn: 22,
    priceUsd: 610, year: 2025, palette: 'moss', generator: 'print',
    edition: { n: 7, of: 35 }, popularity: 47,
    statement: 'Built from three separate ink-wash scans layered digitally before the screens were cut, so no single brushstroke here was ever painted at that scale.'
  },
  {
    id: 'w113', slug: 'blue-composite-study', title: 'Blue Composite Study', artistId: 'a31',
    category: 'print', subject: 'Abstract', style: 'Contemporary',
    medium: 'Screenprint on Paper', widthIn: 22, heightIn: 28,
    priceUsd: 820, year: 2022, palette: 'ultramarine', generator: 'print',
    edition: { n: 23, of: 35 }, popularity: 56,
    statement: 'The most saturated print in the series, since the source ink wash for this one was mixed unusually dark before it was ever scanned.'
  },
  {
    id: 'w114', slug: 'arequipa-volcano-i', title: 'Arequipa Volcano I', artistId: 'a32',
    category: 'print', subject: 'Landscape', style: 'Contemporary',
    medium: 'Linocut on Paper', widthIn: 20, heightIn: 16,
    priceUsd: 1100, year: 2024, palette: 'ochre', generator: 'print',
    edition: { n: 24, of: 40 }, popularity: 90,
    statement: 'Carved from a single large block and printed in a run that sells out locally within days, long before it reaches any gallery listing.'
  },
  {
    id: 'w115', slug: 'arequipa-volcano-ii', title: 'Arequipa Volcano II', artistId: 'a32',
    category: 'print', subject: 'Landscape', style: 'Contemporary',
    medium: 'Linocut on Paper', widthIn: 22, heightIn: 18,
    priceUsd: 640, year: 2023, palette: 'ember', generator: 'print',
    edition: { n: 31, of: 40 }, popularity: 71,
    statement: "A hotter, more saturated inking of the same volcano block, made after the first edition's cooler tone sold out faster than expected."
  },
  {
    id: 'w116', slug: 'ash-plume-study', title: 'Ash Plume Study', artistId: 'a32',
    category: 'print', subject: 'Landscape', style: 'Contemporary',
    medium: 'Linocut on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 560, year: 2022, palette: 'plum', generator: 'print',
    edition: { n: 6, of: 40 }, popularity: 62,
    statement: "The plume rising from the crater is left almost entirely uncarved, letting the paper's own tone stand in for smoke against the darker inked rock."
  },
  {
    id: 'w117', slug: 'volcano-in-grey-ash', title: 'Volcano in Grey Ash', artistId: 'a32',
    category: 'print', subject: 'Landscape', style: 'Minimalism',
    medium: 'Linocut on Paper', widthIn: 16, heightIn: 20,
    priceUsd: 510, year: 2025, palette: 'ash', generator: 'print',
    edition: { n: 14, of: 40 }, popularity: 58,
    statement: "A rare monochrome edition, cut for a show about the region's ash falls rather than for the usual local buyers who prefer the warmer inkings."
  },
  {
    id: 'w118', slug: 'trader-portrait-screenprint', title: 'Trader Portrait Screenprint', artistId: 'a34',
    category: 'print', subject: 'Figurative', style: 'Expressionism',
    medium: 'Screenprint on Paper', widthIn: 18, heightIn: 24,
    priceUsd: 530, year: 2024, palette: 'plum', generator: 'print',
    edition: { n: 27, of: 50 }, popularity: 48,
    statement: 'Adapted from a street portrait into three flat screens, losing the quick brushwork of the original but gaining an edition size he could actually sell through.'
  },
  {
    id: 'w119', slug: 'courtyard-shadow-screenprint', title: 'Courtyard Shadow Screenprint', artistId: 'a38',
    category: 'print', subject: 'Architecture', style: 'Minimalism',
    medium: 'Screenprint on Paper', widthIn: 20, heightIn: 26,
    priceUsd: 610, year: 2025, palette: 'saffron', generator: 'print',
    edition: { n: 9, of: 30 }, popularity: 53,
    statement: "Reduces the midday courtyard to two flat screens only, testing whether the composition still holds without the oil painting's subtler shifts of light."
  },
  {
    id: 'w120', slug: 'dock-blocks-screenprint', title: 'Dock Blocks Screenprint', artistId: 'a39',
    category: 'print', subject: 'Abstract', style: 'Geometric',
    medium: 'Screenprint on Paper', widthIn: 20, heightIn: 24,
    priceUsd: 590, year: 2024, palette: 'rose', generator: 'print',
    edition: { n: 20, of: 40 }, popularity: 50,
    statement: 'A screenprinted variant of the container-colour paintings; the flat screens make the hand-mixed pigment matches impossible, so the palette was rebuilt from scratch.'
  }
];

const byId = new Map(ARTWORKS.map(w => [w.id, w]));
const bySlug = new Map(ARTWORKS.map(w => [w.slug, w]));

export function artworkById(id: string): Artwork | undefined {
  return byId.get(id);
}

export function artworkBySlug(slug: string): Artwork | undefined {
  return bySlug.get(slug);
}

export function artworksByArtist(artistId: string): Artwork[] {
  return ARTWORKS.filter(w => w.artistId === artistId);
}
