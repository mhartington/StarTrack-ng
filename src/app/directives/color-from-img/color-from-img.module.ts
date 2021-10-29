import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorFromImgDirective } from './color-from-img.directive';

@NgModule({
  declarations: [ColorFromImgDirective],
  imports: [CommonModule],
  exports: [ColorFromImgDirective]
})
export class ColorFromImgModule {}
