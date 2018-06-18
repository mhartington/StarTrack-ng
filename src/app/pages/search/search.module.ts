import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePipeModule } from '../../pipes/ms-to-mins/ms-to-mins.module';
import { SearchPage } from './search.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SearchPage }]),
    TimePipeModule,
    ReactiveFormsModule
  ],
  declarations: [SearchPage],
})
export class SearchModule {}

