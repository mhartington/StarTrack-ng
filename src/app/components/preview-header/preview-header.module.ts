import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { PreviewHeaderComponent } from './preview-header.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormatArtworkUrlModule],
  declarations: [PreviewHeaderComponent],
  exports: [PreviewHeaderComponent]
})
export class PreviewHeaderModule {}
