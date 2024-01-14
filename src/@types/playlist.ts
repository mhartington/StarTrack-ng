import { Artwork } from './artwork';
import { PlayParameters, Song } from './song';
export type PlaylistAttributes = {
  artwork: Artwork;
  curatorName: string;
  contentRating: 'clean' | 'explicit';
  description: { short: string; standard: string };
  isChart: boolean;
  lastModifiedDate: string;
  name: string;
  playlistType:
    | 'editorial'
    | 'external'
    | 'personal-mix'
    | 'replay'
    | 'user-shared';
  playParams: PlayParameters;
  url: string;
  trackTypes: string[];
};

export type PlaylistRelationships = {
  curator: { url: string; href: string; data: unknown[] };
  library: { url: string; href: string; data: unknown[] };
  tracks: { url: string; href: string; data: Song[] };
};
// export type PlaylistViews = {
//   'featured-artists': PlaylistFeaturedArtistsView;
//   'more-by-curator': PlaylistMoreByCuratorView;
// };
export type Playlist = {
  attributes: PlaylistAttributes;
  id: string;
  type: 'playlists';
  href: string;
  relationships: PlaylistRelationships;
  // views: PlaylistViews;
};
