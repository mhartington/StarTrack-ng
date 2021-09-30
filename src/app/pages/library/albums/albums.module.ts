import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumsPageRoutingModule } from './albums-routing.module';

import { AlbumsPage } from './albums.page';
import { LetModule, PushModule } from '@rx-angular/template';
import { AlbumPreviewItemsModule } from 'src/app/components/album-preview-items/album-preview-items.module';
import { LazyImgModule } from 'src/app/components/lazy-img/lazy-img.module';
import { FormatArtworkUrlModule } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumsPageRoutingModule,
    LetModule,
    PushModule,
    AlbumPreviewItemsModule,
    LazyImgModule,
    FormatArtworkUrlModule,

  ],
  declarations: [AlbumsPage],
})
export class AlbumsPageModule {}
