import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumPageRoutingModule } from './album-routing.module';

import { AlbumPage } from './album.page';
import { LetModule, PushModule } from '@rx-angular/template';
import { AlbumPreviewItemsModule } from 'src/app/components/album-preview-items/album-preview-items.module';
import { LazyImgModule } from 'src/app/components/lazy-img/lazy-img.module';
import { FormatArtworkUrlModule } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.module';
import { PreviewHeaderModule } from 'src/app/components/preview-header/preview-header.module';
import { SongItemModule } from 'src/app/components/song-item/song-item.module';

@NgModule({
  imports: [
    CommonModule,
    AlbumPageRoutingModule,
    IonicModule,
    // FormsModule,
    LetModule,
    PushModule,
    PreviewHeaderModule,
    SongItemModule,
    // AlbumPreviewItemsModule,
    LazyImgModule,
    FormatArtworkUrlModule,

  ],
  declarations: [AlbumPage],
})
export class AlbumPageModule {}
