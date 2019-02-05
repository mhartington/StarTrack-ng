import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';

const routes: Routes = [
  // { path: '', redirectTo: '/browse', pathMatch: 'full' },
  {
    path: 'search',
    loadChildren: './pages/search/search.module#SearchModule'
  },
  {
    path: 'album/:id',
    loadChildren: './pages/album/album.module#AlbumPageModule'
  },
  {
    path: 'playlist/:id',
    loadChildren: './pages/playlists/playlists.module#PlaylistsPageModule'
  },
  {
    path: 'browse',
    loadChildren: './pages/browse/browse.module#BrowsePageModule'
  },
  { path: '', component: LandingPage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
