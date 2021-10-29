import { Artwork } from './artwork';
import { EditorialNotes, PlayParameters } from './song';

export type StationAttributes = {
  artwork: Artwork;
  durationInMillis: number;
  editorialNotes: EditorialNotes;
  episodeNumber: number;
  contentRating: 'clean' | 'explicit' | null;
  isLive: boolean;
  name: string;
  playParams: PlayParameters;
  stationProviderName: string;
  url: string;
};
export type StationRelationship = {
  href: string;
  next: string;
  data: Station[];
};
export type Station = {
  id: string;
  type: 'stations';
  href: string;
  attributes: StationAttributes;
};
