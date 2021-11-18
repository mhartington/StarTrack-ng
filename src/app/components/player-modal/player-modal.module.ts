import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PlayerModalComponent } from './player-modal.component';
import { LetModule, PushModule } from '@rx-angular/template';
import { SongItemModule } from '../song-item/song-item.module';
import { SvgBarsComponentModule } from '../svg-bars/svg-bars.module';
import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { IonRangeDirectiveModule } from '../../directives/ion-range/ion-range.module';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { FormsModule } from '@angular/forms';
import { ColorFromImgModule } from '../../directives/color-from-img/color-from-img.module';
import { NowPlayingArtworkComponentModule } from '../now-playing-artwork/now-playing-artwork.module';

@NgModule({
  declarations: [PlayerModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    LetModule,
    PushModule,
    SongItemModule,
    FormsModule,
    SvgBarsComponentModule,
    IonRangeDirectiveModule,
    LazyImgModule,
    FormatArtworkUrlModule,
    ColorFromImgModule,
    NowPlayingArtworkComponentModule
  ],
  exports: [PlayerModalComponent],
})
export class PlayerModalModule {}
