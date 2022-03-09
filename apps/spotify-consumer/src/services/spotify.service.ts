import axios, { AxiosResponse } from 'axios';
import {
  Album,
  Country,
  NewReleaseResponse,
  QueryTracksResponse,
  SpotifyAuthResponse,
  Tokens,
  Track,
  TracksOfAlbum,
  User,
} from '../types';

export class SpotifyService {
  constructor(private readonly apiUrl: string) {}

  async signIn(authData: SpotifyAuthResponse): Promise<User> {
    const user: AxiosResponse<User> = await axios.get(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `${authData.token_type} ${authData.access_token}`,
      },
    });

    return user.data;
  }

  async getNewReleaseAlbums(
    tokens: Tokens,
    countryCode?: Country
  ): Promise<Album[]> {
    const countryQuery = countryCode ? `country=${countryCode}` : '';
    const composedTokens = `${tokens.spotify?.token_type} ${tokens.spotify?.access_token}`;
    const newReleases: AxiosResponse<NewReleaseResponse> = await axios.get(
      `${this.apiUrl}/browse/new-releases?total_tracks=1&${countryQuery}`,
      { headers: { Authorization: composedTokens } }
    );

    return newReleases.data.albums.items;
  }

  async getNewReleaseSingleAlbums(tokens: Tokens, countryCode?: Country) {
    const albums = await this.getNewReleaseAlbums(tokens, countryCode);

    return albums.filter(({ album_type }) => album_type === 'single');
  }

  async getTracksPerAlbum(tokens: Tokens, albumId: string): Promise<Track[]> {
    const composedTokens = `${tokens.spotify?.token_type} ${tokens.spotify?.access_token}`;
    const tracksRes: AxiosResponse<TracksOfAlbum> = await axios.get(
      `${this.apiUrl}/albums/${albumId}/tracks`,
      { headers: { Authorization: composedTokens } }
    );
    return tracksRes.data.items;
  }

  async getTracksForManyAlbums(
    tokens: Tokens,
    albums: Album[]
  ): Promise<Track[]> {
    const trackPromises = albums.map(async (album) => {
      const tracks = await this.getTracksPerAlbum(tokens, album.id);
      return { ...tracks[Math.floor(Math.random() * tracks.length)], album };
    });

    return Promise.all(trackPromises);
  }

  async queryTracks(tokens: Tokens, query: string): Promise<Track[]> {
    const composedTokens = `${tokens.spotify?.token_type} ${tokens.spotify?.access_token}`;
    const tracks: AxiosResponse<QueryTracksResponse> = await axios.get(
      `${this.apiUrl}/search?q=${query}&type=track`,
      { headers: { Authorization: composedTokens } }
    );

    return tracks.data.tracks.items;
  }
}
