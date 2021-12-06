import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { AuthGuard } from './providers/auth/auth.service';
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
    path: 'us/album/:id',
    loadChildren: () =>
      import('./pages/album/album.module').then((m) => m.AlbumPageModule),
  },
  {
    path: 'us/playlist/:id',
    loadChildren: () =>
      import('./pages/playlists/playlists.module').then(
        (m) => m.PlaylistPageModule
      ),
  },
  {
    path: 'library',
    loadChildren: () =>
      import('./pages/library/library.module').then((m) => m.LibraryModule),
    canLoad: [AuthGuard],
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
