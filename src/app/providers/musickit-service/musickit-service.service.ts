import { HttpClient, HttpHeaders } from '@angular/common/http';import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { delay, retryWhen, timeout, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusickitService {
  private musicKitInstance = (window as any).MusicKit.getInstance();
  private musicKitEvents = (window as any).MusicKit.Events;
  private apiUrl = `https://api.music.apple.com/v1/catalog/${this.musicKitInstance.storefrontId}`;
  private libraryUrl = `https://api.music.apple.com/v1/me/library`;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.musicKitInstance.developerToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {
    if (this.musicKitInstance.isAuthorized) {
      this.headers = this.headers.append(
        'Music-User-Token',
        this.musicKitInstance.musicUserToken
      );
    }
    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      () => {
        this.headers.append(
          'Music-User-Token',
          this.musicKitInstance.musicUserToken
        );
      }
    );
  }

  // API/Apple Music
  fetchAlbum(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/albums/${id}`, {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => {
          return res.data[0];
        })
      );
  }
  fetchPlaylist(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/playlists/${id}`, {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => {
          return res.data[0];
        })
      );
  }
  fetchAlbumOrPlaylist(type: string, id: string): Observable<any> {
    if (type === 'playlist') {
      return this.fetchPlaylist(id);
    } else {
      return this.fetchAlbum(id);
    }
  }
  fetchPlaylistTracks(nextUrl: string): Observable<any> {
    return this.http.get(this.apiUrl + nextUrl, {
      headers: this.headers,
    });
  }
  fetchArtist(id: string): Observable<any> {
    return from(
      this.musicKitInstance.api.artist(id, {
        include: 'playlists,albums',
        offset: '26',
      })
    );
  }
  search(query: string): Observable<any> {
    const searchTypes = ['songs', 'albums', 'playlists'];

    return this.http
      .get(
        `${this.apiUrl}/search?term=${query}&types=${searchTypes.join(
          ','
        )}&limit=25`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map(({ results }: any) => ({
          albums: results.albums?.data ?? null,
          songs: results.songs?.data ?? null,
          playlists: results.playlists?.data ?? null,
        })),
        retryWhen((error) => error.pipe(delay(500))),
        timeout(5000)
      );
  }
  fetchRecentPlayed(): Observable<any> {
    return from(this.musicKitInstance.api.recentPlayed());
  }
  fetchHeavyRotation(): Observable<any> {
    return from(this.musicKitInstance.api.historyHeavyRotation());
  }
  fetchChart(): Observable<any> {
    const searchTypes = ['songs', 'albums', 'playlists'];
    return from(
      this.http.get(
        `${this.apiUrl}/charts/?types=${searchTypes.join(',')}&limit=30`,
        {
          headers: this.headers,
        }
      )
    ).pipe(
      map(({ results }: any) => ({
        topAlbums: results.albums[0].data,
        topPlaylists: results.playlists[0].data,
        topSongs: results.songs[0].data,
      })),
      retryWhen((error) => error.pipe(delay(500))),
      timeout(5000)
    );
  }
  fetchPlaylists(offset: number): Observable<any> {
    return from(
      this.musicKitInstance.api.library.playlists(null, {
        limit: 100,
        offset,
      })
    ).pipe(
      retryWhen((error) => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  // USER LIBRARY API
  fetchLibrarySongs(offset: number): Observable<any> {
    return from(
      this.musicKitInstance.api.library.songs(null, {
        limit: 100,
        offset,
      })
    );
  }
  fetchLibraryAlbums(offset = 0): Observable<any> {
    return this.http.get(`${this.libraryUrl}/albums?offset=${offset}`, {
      headers: this.headers,
    });
  }
  fetchLibraryAlbum(id: string): Observable<any> {
    return from(this.musicKitInstance.api.library.album(id));
  }
  fetchLibraryArtists(offset: number): Observable<any> {
    return from(
      this.musicKitInstance.api.library.artists(null, {
        limit: 100,
        offset,
      })
    );
  }
  fetchLibraryArtist(id: string): Observable<any> {
    return from(
      this.musicKitInstance.api.library.artist(id, {
        include: 'albums',
      })
    );
  }
  searchLibrary(query: string): Observable<any> {
    const searchTypes = [
      'library-songs',
      'library-albums',
      'library-artists',
      'library-playlists',
    ];
    return from(
      this.musicKitInstance.api.library.search(query, {
        types: searchTypes,
        limit: 20,
      })
    ).pipe(
      map((results: any) => ({
        songResults: results.songs.data,
        albumResults: results.albums.data,
        artistResults: results.artists.data,
        playlistResults: results.playlists.data,
      }))
    );
  }
  fetchLibraryPlaylist(id: string): Observable<any> {
    return from(this.musicKitInstance.api.library.playlist(id));
  }

  // fetchRecentlyAdded(offset: number): Observable<any> {
  //   return from(
  //    this.musicKitInstance.api.library.collection(
  //       'recently-added',
  //       null,
  //       { limit: 10, offset }
  //     )
  //   );
  // }

  // fetchRecommendations(): Observable<any> {
  //   return from(musicKitInstance.api.recommendations());
  // }
}
