import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MusicCardComponent } from './music-card.component';

import { TimePipeModule } from '../../pipes/ms-to-mins/ms-to-mins.module';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '../../directives/directives.module';
import { ColorThiefService } from '../../providers/color-thief/color-thief.service';

@NgModule({
  declarations: [MusicCardComponent],
  imports: [TimePipeModule, CommonModule, DirectivesModule, IonicModule, FormsModule],
  providers: [ColorThiefService],
  exports: [MusicCardComponent]
})
export class MusicCardComponentModule { }
