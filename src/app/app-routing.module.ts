import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.page').then((m) => m.LandingPage),
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./pages/browse/browse.page').then((m) => m.BrowsePage),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.page').then((m) => m.SearchPage),
  },
  {
    path: 'us/album/:id',
    loadComponent: () =>
      import('./pages/album/album.page').then((m) => m.AlbumPage),
  },
  {
    path: 'us/playlist/:id',
    loadComponent: () =>
      import('./pages/playlists/playlists.page').then((m) => m.PlaylistPage),
  },
  {
    path: 'library',
    loadChildren: () =>
      import('./pages/library/library-routes').then((m) => m.routes),
    // canLoad: [AuthGuard],
  },
];
