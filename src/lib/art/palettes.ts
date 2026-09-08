export type ColorFamily =
  | 'Blue' | 'Green' | 'Yellow' | 'Orange'
  | 'Pink' | 'Purple' | 'Neutral' | 'Black & White';

export const PALETTES = {
  sea:         ['#1B3A5C','#3E6E96','#8FB3CC','#DCE5EB','#0B1B2B'],
  ultramarine: ['#232E7A','#4657B8','#8A95DA','#DEE1F4','#101638'],
  tide:        ['#0F6060','#3E9C97','#8CC7C2','#DEEDEB','#063434'],
  moss:        ['#3E5B3A','#6E8C57','#A8BE85','#E6E9D8','#1D2C1A'],
  ochre:       ['#B8862F','#E0BC6E','#7A5418','#F1E6CC','#3B2A0F'],
  saffron:     ['#D9A312','#F0C951','#8A6408','#FAF0D2','#48330A'],
  ember:       ['#A63A22','#D9713F','#EFA86A','#F7E7D6','#4F1A0D'],
  rose:        ['#A83E5B','#D4778E','#EEB0BE','#F9E6EA','#4A1723'],
  plum:        ['#4A2B52','#7A4E85','#AE84B8','#E9DCEC','#241329'],
  ash:         ['#6E6A63','#9E9A92','#C9C5BC','#EFECE5','#38352F'],
  iron:        ['#2C2C2E','#57575C','#8B8B91','#C9C9CE','#111113'],
  bone:        ['#C8BCA6','#E6DECE','#A6957A','#F7F3EA','#7A6A50'],
  graphite:    ['#3A3A3C','#6B6B70','#9C9CA1','#F2F0EB','#1C1C1E'],
  sanguine:    ['#8C4A32','#B87355','#D9A88E','#F4EBE2','#4A2115']
} as const satisfies Record<string, readonly string[]>;

export type PaletteName = keyof typeof PALETTES;

export const PALETTE_COLOR: Record<PaletteName, ColorFamily> = {
  sea:'Blue', ultramarine:'Blue', tide:'Green', moss:'Green',
  ochre:'Yellow', saffron:'Yellow', ember:'Orange', rose:'Pink',
  plum:'Purple', ash:'Neutral', iron:'Black & White', bone:'Neutral',
  graphite:'Black & White', sanguine:'Orange'
};

export const COLOR_SWATCH: Record<ColorFamily, string> = {
  'Blue':'#2E4E86', 'Green':'#4C7A4E', 'Yellow':'#D3A61C', 'Orange':'#C4622C',
  'Pink':'#C06A83', 'Purple':'#6A4478', 'Neutral':'#BDB3A0', 'Black & White':'#3A3A3C'
};
