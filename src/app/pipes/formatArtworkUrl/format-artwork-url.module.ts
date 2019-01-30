import { NgModule } from '@angular/core';
import { FormatArtworkUrlPipe } from './format-artwork-url.pipe';

@NgModule({
  declarations: [FormatArtworkUrlPipe],
  exports: [FormatArtworkUrlPipe]
})
export class FormatArtworkUrlModule {}
