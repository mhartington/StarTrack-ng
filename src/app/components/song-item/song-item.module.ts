import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TimePipeModule } from '../../pipes/ms-to-mins/ms-to-mins.module';
import { SongItemComponent } from './song-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, TimePipeModule],
  declarations: [SongItemComponent],
  exports: [SongItemComponent],
})
export class SongItemModule {}
