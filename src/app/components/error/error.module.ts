import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorComponent } from './error.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
})
export class ErrorComponentModule {}
