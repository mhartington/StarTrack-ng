import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { delay, retryWhen, timeout, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusickitService {
  private musicKitInstance = (window as any).MusicKit.getInstance();
  constructor(private http: HttpClient) {}

  API_URL = 'https://api.music.apple.com';

  getApiHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.musicKitInstance.developerToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': this.musicKitInstance.musicUserToken,
    });
  }

  fetchLibrarySongs(offset: number): Observable<any> {
    return from(
      this.musicKitInstance.api.library.songs(null, {
        limit: 100,
        offset,
      })
    );
  }

  fetchLibraryAlbums(offset: number): Observable<any> {
    return from(
      this.musicKitInstance.api.library.albums(null, {
        limit: 100,
        offset,
      })
    );
  }

  fetchLibraryAlbum(id: string): Observable<any> {
    return from(this.musicKitInstance.api.library.album(id));
  }

  fetchAlbum(id: string): Promise<any> {
    return this.musicKitInstance.api.album(id);
  }

  fetchPlaylist(id: string): Observable<any> {
    return this.musicKitInstance.api.playlist(id);
  }

  fetchAlbumOrPlaylist(type: string, id: string): Observable<any> {
    if (type === 'playlist') {
      return from(this.fetchPlaylist(id));
    } else {
      return from(this.fetchAlbum(id));
    }
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
    return from(
      this.musicKitInstance.api.search(query, {
        types: searchTypes,
        limit: 50,
      })
    ).pipe(
      map((res: any) => ({
        albums: res?.albums.data,
        songs: res?.songs?.data ?? null,
        playlists: res?.playlists?.data ?? null,
      })),
      retryWhen((error) => error.pipe(delay(500))),
      timeout(5000)
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

  fetchLibraryPlaylist(id: string): Observable<any> {
    return from(this.musicKitInstance.api.library.playlist(id));
  }

  fetchPlaylistTracks(nextUrl: string): Observable<any> {
    return this.http.get(this.API_URL + nextUrl, {
      headers: this.getApiHeaders(),
    });
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

  fetchRecentPlayed(): Observable<any> {
    return from(this.musicKitInstance.api.recentPlayed());
  }

  fetchHeavyRotation(): Observable<any> {
    return from(this.musicKitInstance.api.historyHeavyRotation());
  }

  fetchChart(): Observable<any> {
    const searchTypes = ['songs', 'albums', 'playlists'];
    return from(
      this.musicKitInstance.api.charts(null, {
        types: searchTypes,
        limit: 30,
      })
    ).pipe(
      map((res: any) => ({
          topAlbums: res.albums[0].data,
          topPlaylists: res.playlists[0].data,
          topSongs: res.songs[0].data,
        })),
      retryWhen((error) => error.pipe(delay(500))),
      timeout(5000)
    );
  }
}
