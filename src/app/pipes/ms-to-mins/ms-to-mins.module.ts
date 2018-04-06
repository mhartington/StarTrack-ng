import { NgModule } from '@angular/core';
import { MsToMinsPipe } from './ms-to-mins.pipe';

@NgModule({
  declarations: [MsToMinsPipe],
  exports: [MsToMinsPipe]
})
export class TimePipeModule {}
