import { UserCredential } from 'firebase/auth';
import { ActionTypes } from '../store/constants/action-types';
import { Country } from './countries';

export * from './countries';

export type ExcludeMatchingProperties<T, V> = Pick<
T,
{ [K in keyof T]-?: T[K] extends V ? never : K }[keyof T]
>;

export interface Notification {
  id: number | string;
  title?: string;
  content: string;
  type: 'warning' | 'success' | 'info';
}

export interface SpotifyAuthResponse {
  code?: string;
  state: string;
  error?: string;
}

export interface SpotifyCredentials {
  access_token: string;
  expires_in: number;
  state: string;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface SpotifyImage {
  height: number | null;
  width: number | null;
  url: string;
}

export type SpotifyType = 'album' | 'artist' | 'track';

export type AlbumType = 'album' | 'single';

export interface User {
  id: string;
  country: Country;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  images: SpotifyImage[];
  product: string;
  type: SpotifyType;
  uri: string;
}

export interface Tokens {
  spotify?: SpotifyCredentials;
  firebase?: UserCredential;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: SpotifyType;
  uri: string;
}

export interface Album {
  album_type: AlbumType;
  artists: Artist[];
  available_markets: Country[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Track {
  artists: Artist[];
  album?: Album;
  available_markets: Country[];
  disc_number: number;
  duration_ms: number;
  explicit: number;
  external_urls: {
    spotify: string;
  }
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: string;
  type: SpotifyType
  uri: string;
}

export interface NewReleaseResponse {
  albums: {
    href: string;
    items: Album[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }
}

export interface QueryTracksResponse {
  tracks: {
    href: string;
    items: Track[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }
}

export interface TracksOfAlbum {
  href: string;
  items: Track[];
  limit: number;
  next: string | null
  offset: number
  previous: string | null;
  total: number;
}

export interface GeolocationResponse {
  languages: string;
  distance: string;
  countryCode: Country;
  countryName: string;
}

/* ********* REDUX TYPES ************* */
interface BaseAction {
  type: ActionTypes;
  error?: Error | string;
}

export interface AuthState {
  tokens: Tokens;
  user?: User;
  loading: boolean;
  error?: Error | string;
}

export interface AuthAction extends BaseAction {
  user?: User;
  tokens?: Tokens;
  spotifyToken?: SpotifyCredentials;
  firebaseToken?: UserCredential;
}

export interface MusicState {
  newReleases: Track[];
  foundTracks: Track[];
  loading: {
    newRelease: boolean;
    findTracks: boolean;
  };
  error?: Error | string;
}

export interface MusicAction extends BaseAction {
  newReleases?: Track[];
  foundTracks?: Track[];
}

export interface LibraryState {
  loading: {
    update: boolean;
    get: boolean;
  }
  tracks: Track[];
  error?: Error | string;
}

export interface LibraryAction extends BaseAction {
  tracks?: Track[];
  library?: Track[];
  trackId?: string;
}

export interface NotificationsState {
  notifications: Notification[];
}

export interface NotificationsAction extends BaseAction {
  notification?: Notification;
  notificationId?: string | number;
}
