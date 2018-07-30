import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenulistModule } from '../../components/menulist/menulist.module';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MenulistModule,
    RouterModule.forChild([
      {
        path: '',
        component: MenuPage,
        children: [
          {
            path: 'search',
            loadChildren: '../search/search.module#SearchModule'
          },
          {
            path: 'detail/:id',
            loadChildren: '../track-detail/track-detail.module#TrackDetailModule'
          },
          { path: '', redirectTo: 'search', pathMatch: 'full' }
        ]
      }
    ])
  ],
  declarations: [MenuPage]
})
export class MenuModule {}
