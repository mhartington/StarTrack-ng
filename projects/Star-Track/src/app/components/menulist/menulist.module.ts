import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MenulistComponent } from './menulist.component';
@NgModule({
  declarations: [MenulistComponent],
  imports: [CommonModule, IonicModule],
  providers: [],
  exports: [MenulistComponent]
})
export class MenulistModule {}
