import { Injectable } from '@angular/core';
import { LoadingController, IonicSafeString } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { delay, retryWhen, timeout, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusickitService {
  private musicKitInstance = (window as any).MusicKit.getInstance();
  constructor(private loadingCtrl: LoadingController) {}

  // API/Apple Music
  fetchAlbum(id: string): Observable<any> {
    // const params = encodeURI(`extend=editorialVideo`);
    return from(
this.musicKitInstance.api.music(
  `v1/catalog/${this.musicKitInstance.storefrontId}/albums/${id}`,
  {
    // extend: 'artistUrl,composerUrl,trackCount,editorialVideo,editorialArtwork',
  }
)
    ).pipe(map((res: any) => res.data.data[0]));
  }
  fetchPlaylist(id: string): Observable<any> {
    return from(
      this.musicKitInstance.api.music(
        `v1/catalog/${this.musicKitInstance.storefrontId}/playlists/${id}`
      )
    ).pipe(map((res: any) => res.data.data[0]));
  }
  fetchAlbumOrPlaylist(type: string, id: string): Observable<any> {
    if (type === 'playlist') {
      return this.fetchPlaylist(id);
    } else {
      return this.fetchAlbum(id);
    }
  }
  // fetchPlaylistTracks(nextUrl: string): Observable<any> {
  //   return this.http.get(this.apiUrl + nextUrl, {
  //     headers: this.headers,
  //   });
  // }

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
      this.musicKitInstance.api.music(
        `v1/catalog/${this.musicKitInstance.storefrontId}/search`,
        {
          term: query,
          types: searchTypes,
          limit: 25,
        }
      )
    ).pipe(
      map(({ data }: any) => ({
        albums: data.results.albums?.data ?? null,
        songs: data.results.songs?.data ?? null,
        playlists: data.results.playlists?.data ?? null,
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
      this.musicKitInstance.api.music(
        `v1/catalog/${this.musicKitInstance.storefrontId}/charts`,
        {
          types: searchTypes,
          limit: 32,
        }
      )
    ).pipe(
      map(({ data }: any) => ({
        topAlbums: data.results.albums[0].data,
        topPlaylists: data.results.playlists[0].data,
        topSongs: data.results.songs[0].data,
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
  // offset: number
  fetchLibrarySongs(offset = 0): Observable<any> {
    const url = 'v1/me/library/songs';
    return this.fetchLibPage(url, offset);
  }

  fetchLibPage(url: string, offset: number) {
    return from(
      this.musicKitInstance.api.music(url, { offset, limit: 100 })
    ).pipe(map((res: any) => res.data));
  }

  parseNext(next: string, fallback: number = 0): number {
    return next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;
  }

  fetchLibraryAlbums(offset = 0): Observable<any> {
    return from(
      this.musicKitInstance.api.music('v1/me/library/albums', { offset })
    ).pipe(map((res: any) => res.data));
  }

  fetchLibraryAlbum(id: string): Observable<any> {
    return from(
      this.musicKitInstance.api.music(`v1/me/library/albums/${id}`, {
        extend: ['editorialVideo'],
      })
    ).pipe(map((res: any) => res.data.data[0]));
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

  async addToLibrary(id: string, type: string) {
    const message = new IonicSafeString(`
      <div>
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 52 52">
          <path class="checkmark__check" fill="none" stroke="grey" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <h1>Added to Library</h1>
      <div>
    `);
    const loader = await this.loadingCtrl.create({
      cssClass: 'loader-add-to-library',
      message,
      spinner: null,
      duration: 2000,
    });
    await this.musicKitInstance.addToLibrary(id, type);
    await loader.present();
  }

  fetchRecentlyAdded(): Observable<any> {
    return from(
      this.musicKitInstance.api.music('v1/me/library/recently-added', {limit: 25})
    ).pipe(map((res: any) => res.data.data));
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
