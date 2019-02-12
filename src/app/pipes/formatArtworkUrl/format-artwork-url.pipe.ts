import { Pipe } from '@angular/core';
declare var MusicKit: any;
@Pipe({
  name: 'formatArtworkUrl',
  pure: true
})
export class FormatArtworkUrlPipe {
  transform(url: string, dim: number): string {
    if (!url) return './assets/imgs/default.jpeg';
    return MusicKit.formatArtworkURL({ url }, dim, dim);
  }
}
