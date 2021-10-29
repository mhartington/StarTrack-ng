import {
  EditorialNotes,
  GenreRelationship,
  PlaylistRelationship,
} from './song';
import { StationRelationship } from './station';

export type ArtistAttributes = {
  editorialNotes: EditorialNotes;
  genreNames: string[];
  name: string;
  url: string;
};

export type ArtistRelationship = { href: string; next: string; data: Artist[] };

export type ArtistsRelationships = {
  albums: ArtistRelationship;
  genres: GenreRelationship;
  playlists: PlaylistRelationship;
  station: StationRelationship;
};

export type Artist = {
  id: string;
  type: 'artists';
  href: string;
  attributes: ArtistAttributes;
  relationships: ArtistsRelationships;
};
