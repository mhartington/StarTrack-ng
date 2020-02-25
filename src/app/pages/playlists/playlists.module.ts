import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlaylistsPage } from './playlists.page';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { PreviewHeaderModule } from '../../components/preview-header/preview-header.module';
import { ErrorComponentModule } from 'src/app/components/error/error.module';

const routes: Routes = [
  {
    path: '',
    component: PlaylistsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewHeaderModule,
    ErrorComponentModule,
    SongItemModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaylistsPage]
})
export class PlaylistsPageModule {}
