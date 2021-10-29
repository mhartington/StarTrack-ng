import { Artist } from './artist';
import { LibraryAlbum } from './library-album';

export type LibraryArtistAttributes = { name: string };
export type LibraryArtistRelationships = {
  albums: { href: string; url: string; data: LibraryAlbum[] };
  catalog: { href: string; url: string; data: Artist[] };
};
export type LibraryArtists = {
  id: string;
  type: 'library-artists';
  href: string;
  attributes: LibraryArtistAttributes;
  relationships: LibraryArtistRelationships;
};
