import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlbumPage } from './album.page';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { PreviewHeaderModule } from '../../components/preview-header/preview-header.module';

const routes: Routes = [
  {
    path: '',
    component: AlbumPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PreviewHeaderModule,
    SongItemModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlbumPage]
})
export class AlbumPageModule {}
