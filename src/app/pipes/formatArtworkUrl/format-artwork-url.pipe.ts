import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatArtworkUrl',
  pure: true,
  standalone: true,
})
export class FormatArtworkUrlPipe implements PipeTransform {
  transform(url: string, dim: number): string {
    if (!url) {
      return '';
    }
    return url.replace(/\{w\}|\{h\}/g, dim.toString()).replace(/\{f\}/, 'webp'); //.replace('.jpg', '.webp');
  }
}

export const formatArtwork = (url: string, dim: number) =>
  url.replace(/\{w\}|\{h\}/g, dim.toString()).replace(/\{f\}/, 'webp'); //.replace('.jpg', '.webp');
