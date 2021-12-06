import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongsPageRoutingModule } from './songs-routing.module';

import { LetModule, PushModule } from '@rx-angular/template';
import { SongsPage } from './songs.page';
import { SongItemModule } from 'src/app/components/song-item/song-item.module';
import { LazyImgModule } from 'src/app/components/lazy-img/lazy-img.module';
import { FormatArtworkUrlModule } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongsPageRoutingModule,
    LetModule, PushModule,
    SongItemModule, LazyImgModule, FormatArtworkUrlModule
  ],
  declarations: [SongsPage]
})
export class SongsPageModule {}
