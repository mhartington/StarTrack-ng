import { Pipe, PipeTransform } from '@angular/core';
// declare var MusicKit: any;
@Pipe({ name: 'formatArtworkUrl' })
export class FormatArtworkUrlPipe implements PipeTransform {
  transform(url: string, dim: number): string {
    if (!url) {
      return './assets/imgs/default.jpeg';
    }
    return url.replace(/\{w\}|\{h\}/g, dim.toString());
    // return MusicKit.formatArtworkURL({ url }, dim, dim);
  }
}
