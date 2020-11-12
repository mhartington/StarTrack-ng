import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
const routes: Routes = [
  { path: '', component: LandingPage },
  {
    path: 'browse',
    loadChildren: () =>
      import('./pages/browse/browse.module').then((m) => m.BrowsePageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: ':type/:id',
    loadChildren: () =>
      import('./pages/album/album.module').then((m) => m.AlbumPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
