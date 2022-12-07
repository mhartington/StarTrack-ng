import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'library/albums',
    pathMatch: 'full',
  },
  {
    path: 'albums',
    loadComponent: () =>
      import('./albums/albums.page').then((m) => m.AlbumsPage),
  },
  {
    path: 'albums/:id',
    loadComponent: () =>
      import('./album/album.page').then((m) => m.AlbumPage),
  },
  {
    path: 'playlists/:id',
    loadComponent: () =>
      import('./playlist/playlist.page').then((m) => m.PlaylistPage),
  },
  {
    path: 'songs',
    loadComponent: () =>
      import('./songs/songs.page').then((m) => m.SongsPage),
  },
  {
    path: 'recently-added',
    loadComponent: () =>
      import('./recently-added/recently-added.page').then(
        (m) => m.RecentlyAddedPage
      ),
  },
];

