import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DetailModalComponent } from './detail-modal.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [DetailModalComponent],
  exports: [DetailModalComponent],
})
export class DetailModalComponentModule {}
