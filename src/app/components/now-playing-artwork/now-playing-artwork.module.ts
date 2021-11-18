import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { NowPlayingArtworkComponent } from './now-playing-artwork.component';
import { FormatArtworkUrlModule } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.module';

@NgModule({
  imports: [CommonModule, LazyImgModule, FormatArtworkUrlModule],
  declarations: [NowPlayingArtworkComponent],
  exports: [NowPlayingArtworkComponent],
})
export class NowPlayingArtworkComponentModule {}
