import { Artist } from './artist';
import { Artwork } from './artwork';
import { LibraryAlbum } from './library-album';
import { LibraryArtists } from './library-artist';
import { PlayParameters } from './song';

export type LibraryRelationship = {
  href: string;
  next: string;
  data: LibrarySong[];
};

export type LibrarySongAtrributes = {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  contentRating: 'clean' | 'explicit';
  discNumber: number;
  durationInMillis: number;
  genreNames: string[];
  hasLyrics: boolean;
  name: string;
  playParams: PlayParameters;
  releaseDate: string;
  trackNumber: number;
};

export type LibrarySongRelationships = {
  albums: { href: string; url: string; data: LibraryAlbum[] };
  artists: { href: string; url: string; data: LibraryArtists[] };
  catalog: { href: string; url: string; data: Artist[] };
};

export type LibrarySong = {
  id: string;
  type: 'library-songs';
  href: string;
  attributes: LibrarySongAtrributes;
  relationships: LibrarySongRelationships;
};
