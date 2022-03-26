import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import {
  Album,
  Country,
  NewReleaseResponse,
  QueryTracksResponse,
  SpotifyAuthResponse,
  GetPlaylistsResponse,
  CreatePlaylistBody,
  SpotifyCredentials,
  Tokens,
  Track,
  TracksOfAlbum,
  User,
  Playlist,
} from '../types';
import { trasnforToURLEncodedForm } from '../utils';

export class SpotifyService {
  constructor(
    private readonly apiUrl: string,
    private readonly authUrl?: string
  ) {}

  private appendExpiresDateToCredentials(
    creds: SpotifyCredentials
  ): SpotifyCredentials {
    const timePlusExpire = new Date().getTime() + creds.expires_in * 1000;
    const expiresDate = new Date(timePlusExpire);

    Object.assign<SpotifyCredentials, Partial<SpotifyCredentials>>(creds, {
      expires_date: expiresDate,
    });

    return creds;
  }

  async signIn(authData: SpotifyAuthResponse): Promise<SpotifyCredentials> {
    const token: AxiosResponse<SpotifyCredentials> = await axios.post(
      `${this.authUrl}/api/token`,
      trasnforToURLEncodedForm({
        grant_type: 'authorization_code',
        code: authData.code ?? '',
        redirect_uri: process.env['NX_REDIRECT_URI'] ?? '',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env['NX_CLIENT_ID'] +
                ':' +
                process.env['NX_CLIENT_SECRET']
            ).toString('base64'),
        },
      }
    );

    return this.appendExpiresDateToCredentials(token.data);
  }

  async userProfile(creds: SpotifyCredentials): Promise<User> {
    const user: AxiosResponse<User> = await axios.get(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `${creds.token_type} ${creds.access_token}`,
      },
    });

    return user.data;
  }

  async refreshToken(token: SpotifyCredentials): Promise<SpotifyCredentials> {
    const newToken: AxiosResponse<{
      access_token: string;
      expires_in: number;
    }> = await axios.post(
      `${this.authUrl}/api/token`,
      trasnforToURLEncodedForm({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env['NX_CLIENT_ID'] +
                ':' +
                process.env['NX_CLIENT_SECRET']
            ).toString('base64'),
        },
      }
    );

    return this.appendExpiresDateToCredentials({ ...token, ...newToken.data });
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

  async getPlaylists(tokens: Tokens, user: User): Promise<Playlist[]> {
    const res: AxiosResponse<GetPlaylistsResponse> = await axios({
      url: `${this.apiUrl}/users/${user.id}/playlists`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokens.spotify?.access_token}`,
      },
      params: {
        limit: 20,
      },
    });

    return res.data.items;
  }

  async createPlaylist(
    tokens: Tokens,
    user: User,
    data: CreatePlaylistBody
  ): Promise<Playlist> {
    const res: AxiosResponse<Playlist> = await axios({
      url: `${this.apiUrl}/users/${user.id}/playlists`,
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${tokens.spotify?.access_token}`,
      },
    });

    return res.data;
  }

  async updatePlaylist(
    tokens: Tokens,
    playlist: Playlist,
    tracks: Track[]
  ): Promise<{ snapshot_id: string }> {
    const res: AxiosResponse<{ snapshot_id: string }> = await axios({
      url: `${this.apiUrl}/playlists/${playlist.id}/tracks`,
      method: 'POST',
      data: {
        uris: tracks.map(({ uri }) => uri),
      },
      headers: {
        Authorization: `Bearer ${tokens.spotify?.access_token}`,
      },
    });

    return res.data;
  }

  async createPlaylistWithTracks(
    tokens: Tokens,
    user: User,
    data: CreatePlaylistBody,
    tracks: Track[]
  ): Promise<Playlist> {
    const playlist = await this.createPlaylist(tokens, user, data);
    await this.updatePlaylist(tokens, playlist, tracks);

    return playlist;
  }
}
