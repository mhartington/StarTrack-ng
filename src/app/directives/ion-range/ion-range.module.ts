import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRangeDirective } from './ion-range.directive';
@NgModule({
  imports: [ CommonModule ],
  declarations: [IonRangeDirective],
  exports: [IonRangeDirective]
})
export class IonRangeDirectiveModule {}
