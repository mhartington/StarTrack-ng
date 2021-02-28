import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePipeModule } from '../../pipes/ms-to-mins/ms-to-mins.module';
import { SearchPage } from './search.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { ErrorComponentModule } from 'src/app/components/error/error.module';
import { PushModule, LetModule } from '@rx-angular/template';
import { LazyImgModule } from 'src/app/components/lazy-img/lazy-img.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SongItemModule,
    FormatArtworkUrlModule,
    LazyImgModule,
    ErrorComponentModule,
    RouterModule.forChild([{ path: '', component: SearchPage }]),
    TimePipeModule,
    ReactiveFormsModule,
    PushModule, LetModule
  ],
  declarations: [SearchPage],
})
export class SearchModule {}
