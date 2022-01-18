import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RecentlyAddedPageRoutingModule } from './recently-added-routing.module';

import { RecentlyAddedPage } from './recently-added.page';
import { LetModule, PushModule } from '@rx-angular/template';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RecentlyAddedPageRoutingModule,
    LetModule,
    PushModule,
  ],
  declarations: [RecentlyAddedPage],
})
export class RecentlyAddedPageModule {}
