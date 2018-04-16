import { CommonModule } from '@angular/common';
import { MusicCardComponentModule } from '../../components/music-card/music-card.module';

import { IonicModule } from '@ionic/angular';
import { ItunesService } from '../../providers/itunes/itunes.service';
import { TrackDetailPage } from './track-detail.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrackResolver } from '../../resolver/track-detail-resolver';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MusicCardComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrackDetailPage,
        resolve: { track: TrackResolver }
      }
    ])
  ],
  declarations: [TrackDetailPage],
  providers: [ItunesService, TrackResolver]
})
export class TrackDetailModule {}
