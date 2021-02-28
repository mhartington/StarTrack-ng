import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackPlayerComponent } from './track-player.component';
import { IonicModule } from '@ionic/angular';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { IonRangeDirectiveModule } from 'src/app/directives/ion-range/ion-range.module';
import { LetModule } from '@rx-angular/template';
import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { PlayerModalModule } from '../player-modal/player-modal.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TrackPlayerComponent],
  imports: [
    FormsModule,
    LazyImgModule,
    FormatArtworkUrlModule,
    IonicModule,
    CommonModule,
    IonRangeDirectiveModule,
    LetModule,
    PlayerModalModule,
  ],
  exports: [TrackPlayerComponent],
})
export class TrackPlayerModule {}
