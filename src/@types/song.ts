import { AlbumRelationship } from './album';
import { Artist, ArtistRelationship } from './artist';
import { Artwork } from './artwork';
import { Genre } from './genres';
import { LibrarySong } from './library-song';
import { Playlist } from './playlist';
import { StationRelationship } from './station';

export type Preview = {
  artwork: Artwork;
  url: string;
  hlsUrl: string;
};

export type PlayParameters = {
  id: string;
  kind: string;
};

export type EditorialNotes = {
  short: string;
  standard: string;
  name: string;
  tagline: string;
};

export type GenreRelationship = { href: string; next: string; data: Genre[] };

export type ComposerRelationship = {
  href: string;
  next: string;
  data: Artist[];
};

export type LibraryRelationship = {
  href: string;
  next: string;
  data: LibrarySong[];
};

export type PlaylistRelationship = {
  href: string;
  next: string;
  data: Playlist[];
};

export type SongAttributes = {
  albumName?: string;
  artistName?: string;
  artwork?: Artwork;
  attribution?: string;
  composerName?: string;
  contentRating?: 'clean' | 'explicit';
  discNumber?: number;
  durationInMillis?: number;
  editorialNotes?: EditorialNotes;
  genreNames?: string[];
  hasLyrics?: boolean;
  isrc?: string;
  movementCount?: number;
  movementName?: string;
  movementNumber?: number;
  name?: string;
  playParams?: PlayParameters;
  previews?: Preview[];
  releaseDate?: string;
  trackNumber?: number;
  url?: string;
  workName?: string;
  artistUrl?: string;
  inLibrary?: boolean;
};

export type SongRelationships = {
  albums: AlbumRelationship;
  artists: ArtistRelationship;
  genres: GenreRelationship;
  station: StationRelationship;
  composers: ComposerRelationship;
  library: LibraryRelationship;
};

export type Song = {
  id?: string;
  type?: 'songs';
  href?: string;
  attributes?: SongAttributes;
  relationships?: SongRelationships;
};
