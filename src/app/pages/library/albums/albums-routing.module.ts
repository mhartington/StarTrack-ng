import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsPage } from './albums.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsPageRoutingModule {}
