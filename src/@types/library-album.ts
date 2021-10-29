import { Artist } from './artist';
import { Artwork } from './artwork';
import { LibraryArtists } from './library-artist';
import { LibrarySong } from './library-song';
import { PlayParameters } from './song';

export type LibraryAlbumAttributes = {
  artistName: string;
  artwork: Artwork;
  contentRating: 'clean' | 'explicit' | null;
  dateAdded: string;
  name: string;
  playParams: PlayParameters;
  releaseDate: string;
  trackCount: number;
  genreNames: string[];
};
export type LibraryAlbumRelationships = {
  artists: { href: string; url: string; data: LibraryArtists[] };
  catalog: { href: string; url: string; data: Artist[] };
  tracks: { href: string; url: string; data: LibrarySong[] };
};
export type LibraryAlbum = {
  id: string;
  type: 'library-albums';
  href: string;
  attributes: LibraryAlbumAttributes;
  relationships: LibraryAlbumRelationships;
};
