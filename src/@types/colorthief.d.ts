declare module 'colorthief' {
  type Color = [number, number, number];
  export default class ColorThief {
    getColor: (img: HTMLImageElement | null) => Color;
    getColorFromUrl: (imgSrc: string | null) => Color;
    getPalette: (img: HTMLImageElement | null) => Color[];
  }
}
