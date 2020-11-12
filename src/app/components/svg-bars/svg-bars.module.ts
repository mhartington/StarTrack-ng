import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SvgBarsComponent } from './svg-bars.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [SvgBarsComponent],
  exports: [SvgBarsComponent]
})
export class SvgBarsComponentModule {}
