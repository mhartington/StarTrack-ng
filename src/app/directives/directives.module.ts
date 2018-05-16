import { NgModule } from '@angular/core';
import {ColorFromImageDirective} from './color-from-image/color-from-image.directive';
@NgModule({
  declarations: [ColorFromImageDirective],
  exports: [ColorFromImageDirective]
})
export class DirectivesModule {}
