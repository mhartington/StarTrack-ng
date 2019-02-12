import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlbumPreviewItemsModule } from '../../components/album-preview-items/album-preview-items.module';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { BrowsePage } from './browse.page';

const routes: Routes = [
  {
    path: '',
    component: BrowsePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongItemModule,
    AlbumPreviewItemsModule,
    FormatArtworkUrlModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BrowsePage]
})
export class BrowsePageModule {}
