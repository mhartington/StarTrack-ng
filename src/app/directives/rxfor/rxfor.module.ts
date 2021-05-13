import { NgModule } from '@angular/core';
import { RxFor } from './rxfor.directive';

const DECLARATIONS = [RxFor];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS,
})
export class RxForModule {}
