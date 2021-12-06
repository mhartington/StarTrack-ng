import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '/',
    redirectTo: 'library/albums',
    pathMatch: 'full',
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./albums/albums.module').then((m) => m.AlbumsPageModule),
  },
  {
    path: 'albums/:id',
    loadChildren: () =>
      import('./album/album.module').then((m) => m.AlbumPageModule),
  },
  {
    path: 'songs',
    loadChildren: () =>
      import('./songs/songs.module').then((m) => m.SongsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class LibraryModule {}
