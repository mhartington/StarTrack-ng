import { Artwork } from './artwork';
import { EditorialNotes, PlayParameters, Preview } from './song';

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

export type AlbumRelationship = { href: string; next: string; data: Album[] };

export type Album = {
  attributes: AlbumAttributes;
  id: string;
  type: string;
  href: string;
  relationships: any;
};
