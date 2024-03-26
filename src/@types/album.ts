import { Artist } from './artist';
import { Artwork } from './artwork';
import { EditorialNotes, PlayParameters, Preview, Song } from './song';

export type AlbumAttributes = {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  attribution: string;
  composerName: string;
  contentRating: 'clean' | 'explicit';
  discNumber: number;
  durationInMillis: number;
  editorialNotes: EditorialNotes;
  genreNames: string[];
  hasLyrics: boolean;
  isrc: string;
  movementCount: number;
  movementName: string;
  movementNumber: number;
  name: string;
  playParams: PlayParameters;
  previews: Preview[];
  releaseDate: string;
  trackNumber: number;
  url: string;
  workName: string;
  artistUrl: string;
};

export type AlbumRelationship = { 
  tracks: { href: string; data: Song[]},
  artists: { href: string; data: Artist[]}
}

export type Album = {
  attributes: AlbumAttributes;
  id: string;
  type: 'albums';
  href: string;
  relationships: AlbumRelationship;
};
