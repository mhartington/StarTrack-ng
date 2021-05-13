import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlbumPreviewItemsModule } from '../../components/album-preview-items/album-preview-items.module';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { BrowsePage } from './browse.page';
import { ErrorComponentModule } from 'src/app/components/error/error.module';
import { LetModule } from '@rx-angular/template';
import { LazyImgModule } from 'src/app/components/lazy-img/lazy-img.module';
import { RxForModule } from 'src/app/directives/rxfor/rxfor.module';

const routes: Routes = [
  {
    path: '',
    component: BrowsePage,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongItemModule,
    AlbumPreviewItemsModule,
    FormatArtworkUrlModule,
    ErrorComponentModule,
    RouterModule.forChild(routes),
    LetModule,
    LazyImgModule,
    RxForModule
  ],
  declarations: [BrowsePage],
})
export class BrowsePageModule {}
