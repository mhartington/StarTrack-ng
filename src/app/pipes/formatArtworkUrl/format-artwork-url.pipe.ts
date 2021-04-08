import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'formatArtworkUrl', pure: true })
export class FormatArtworkUrlPipe implements PipeTransform {
  transform(url: string, dim: number): string {
    if (!url) {return '';}
    return url.replace(/\{w\}|\{h\}/g, dim.toString());
  }
}
