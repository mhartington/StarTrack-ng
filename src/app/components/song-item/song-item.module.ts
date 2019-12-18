import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { TimePipeModule } from '../../pipes/ms-to-mins/ms-to-mins.module';
import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { SongItemComponent } from './song-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormatArtworkUrlModule, TimePipeModule, LazyImgModule],
  declarations: [SongItemComponent],
  exports: [SongItemComponent]
})
export class SongItemModule {}

