import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MenulistComponent } from './menulist.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [MenulistComponent],
  imports: [RouterModule,CommonModule, IonicModule],
  providers: [],
  exports: [MenulistComponent]
})
export class MenulistModule {}
