import { NgModule } from '@angular/core';
import { TrackPlayerComponent } from './track-player.component';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonRangeDirectiveModule } from 'src/app/directives/ion-range/ion-range.module';
import {ReactiveComponentModule} from '@ngrx/component';
@NgModule({
  declarations: [TrackPlayerComponent],
  imports: [
    FormatArtworkUrlModule,
    IonicModule,
    CommonModule,
    IonRangeDirectiveModule,
    ReactiveComponentModule
  ],
  exports: [TrackPlayerComponent]
})
export class TrackPlayerModule {}
