import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';

const routes: Routes = [
  { path: '', component: LandingPage },
  {
    path: 'browse',
    loadChildren: () => import('./pages/browse/browse.module').then(m => m.BrowsePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'album/:id',
    loadChildren: () => import('./pages/album/album.module').then(m => m.AlbumPageModule)
  },
  {
    path: 'playlist/:id',
    loadChildren: () => import('./pages/playlists/playlists.module').then( m => m.PlaylistsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
