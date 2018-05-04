import { CommonModule } from '@angular/common';
import { MusicCardComponentModule } from '../../components/music-card/music-card.module';
import { IonicModule } from '@ionic/angular';
import { TrackDetailPage } from './track-detail.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MusicCardPlaceholderModule } from '../../components/music-card-placeholder/music-card-placeholder.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MusicCardComponentModule,
    MusicCardPlaceholderModule,
    RouterModule.forChild([{ path: '', component: TrackDetailPage }])
  ],
  declarations: [TrackDetailPage]
})
export class TrackDetailModule {}
