import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PlayerModalComponent } from './player-modal.component';
import { LetModule, PushModule } from '@rx-angular/template';
import { SongItemModule } from '../song-item/song-item.module';
import { SvgBarsComponentModule } from '../svg-bars/svg-bars.module';
import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { IonRangeDirectiveModule } from 'src/app/directives/ion-range/ion-range.module';
import { FormatArtworkUrlModule } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.module';
import { FormsModule } from '@angular/forms';

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
  ],
  exports: [PlayerModalComponent],
})
export class PlayerModalModule {}
