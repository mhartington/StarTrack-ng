import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { from, Observable, of } from 'rxjs';
import { timeout, map, retry, switchMap } from 'rxjs/operators';
import { Album } from 'src/@types/album';
import { Playlist } from 'src/@types/playlist';
import { Song } from 'src/@types/song';
import { checkmarkCircle, list } from 'ionicons/icons';
@Injectable({
  providedIn: 'root',
})
export class MusickitService {
  private musicKitInstance = globalThis.MusicKit?.getInstance();
  private toastCtrl = inject(ToastController);

  // API/Apple Music
  async fetchAlbum(id: string): Promise<Album> {
    const {
      data: { data: res },
    }: { data: { data: [Album] } } = await this.musicKitInstance.api.music(
      `v1/catalog/${this.musicKitInstance.storefrontId}/albums/${id}`,
      {
        'art[url]': 'f',

        'include[albums]': 'tracks',
      },
    );
    // const albumRes = res[0];
    // const songsToFetch = albumRes.relationships.tracks.data.map(
    //   (song) => song.id,
    // );

    // const { data: newSongs } = await this.fetchSongs(songsToFetch);
    // albumRes.relationships.tracks.data = newSongs.data;
    return res[0];
  }
  async fetchPlaylist(id: string): Promise<Playlist> {
    const {
      data: { data: res },
    }: { data: { data: [Playlist] } } = await this.musicKitInstance.api.music(
      `v1/catalog/${this.musicKitInstance.storefrontId}/playlists/${id}`,
      { 'art[url]': 'f' },
    );
    const playlistRes = res[0];
    const songsToFetch = playlistRes.relationships.tracks.data.map(
      (song) => song.id,
    );
    const { data: newSongs } = await this.fetchSongs(songsToFetch);
    playlistRes.relationships.tracks.data = newSongs.data;
    return playlistRes;
  }
  fetchAlbumOrPlaylist(type: string, id: string): Promise<Album | Playlist> {
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
        'art[url]': 'f',
      }),
    );
  }
  search(term: string): Observable<any> {
    const types = ['songs', 'albums', 'playlists'];
    return from(
      this.musicKitInstance.api.music(
        `v1/catalog/${this.musicKitInstance.storefrontId}/search`,
        { term, types, limit: 25 },
      ),
    ).pipe(
      map(({ data }: any) => ({
        albums: data.results.albums?.data ?? null,
        songs: data.results.songs?.data ?? null,
        playlists: data.results.playlists?.data ?? null,
      })),
      switchMap(
        (orgData: {
          albums: Album[];
          songs: Song[];
          playlists: Playlist[];
        }) => {
          if (orgData.songs.length === 0) return of(orgData);
          const songsToFetch = orgData.songs.map((song) => song.id);
          return this.fetchSongs(songsToFetch).then(({ data: newSongs }) => ({
            ...orgData,
            songs: newSongs.data,
          }));
        },
      ),
      retry({ delay: 500 }),
      timeout(5000),
    );
  }

  async searchAsync(term: string) {
    const types = ['songs', 'albums', 'playlists'];
    const { data } = await this.musicKitInstance.api.music(
      `v1/catalog/${this.musicKitInstance.storefrontId}/search`,
      { term, types, limit: 25, 'art[url]': 'f' },
    );
    const ogData: { albums: Album[]; songs: Song[]; playlists: Playlist[] } = {
      albums: data.results.albums?.data ?? null,
      songs: data.results.songs?.data ?? null,
      playlists: data.results.playlists?.data ?? null,
    };

    const songsToFetch = ogData.songs.map((song) => song.id);
    const { data: newSongs } = await this.fetchSongs(songsToFetch);
    ogData.songs = newSongs.data;
    return ogData;
  }

  async fetchSongs(ids: string[]) {
    return this.musicKitInstance.api.music(
      `v1/catalog/${this.musicKitInstance.storefrontId}/songs`,
      {
        ids,
        'art[url]': 'f',
        fields:
          'inLibrary,albumName,artistName,artwork,composerName,discNumber,durationInMillis,genreNames,hasLyrics,isAppleDigitalMaster,isrc,name,playParams,previews,releaseDate,trackNumber,url',
      },
    );
  }

  fetchRecentPlayed(): Observable<any> {
    return from(this.musicKitInstance.api.recentPlayed());
  }
  fetchHeavyRotation(): Observable<any> {
    return from(this.musicKitInstance.api.historyHeavyRotation());
  }
  async fetchChart(): Promise<any> {
    const searchTypes = ['songs', 'albums', 'playlists'];
    const { data } = await this.musicKitInstance.api.music(
      `v1/catalog/${this.musicKitInstance.storefrontId}/charts`,
      {
        types: searchTypes,
        limit: 32,
        'art[url]': 'f',
      },
    );

    const orgData: {
      topAlbums: Album[];
      topPlaylists: Playlist[];
      topSongs: Song[];
    } = {
      topAlbums: data.results.albums[0].data,
      topPlaylists: data.results.playlists[0].data,
      topSongs: data.results.songs[0].data,
    };
    const songsToFetch = orgData.topSongs.map((song) => song.id);

    const { data: newSongs } = await this.fetchSongs(songsToFetch);
    orgData.topSongs = newSongs.data;
    return orgData;

    //   .pipe(
    //   map(({ data }: any) => ({
    //     topAlbums: data.results.albums[0].data,
    //     topPlaylists: data.results.playlists[0].data,
    //     topSongs: data.results.songs[0].data,
    //   })),
    //   retryWhen((error) => error.pipe(delay(500))),
    //   timeout(5000)
    // );
  }
  fetchPlaylists(offset: number): Observable<any> {
    return from(
      this.musicKitInstance.api.library.playlists(null, {
        limit: 100,
        offset,
        'art[url]': 'f',
      }),
    ).pipe(retry({ delay: 500 }), timeout(5000));
  }

  // USER LIBRARY API
  // offset: number
  async fetchLibrarySongs(offset = 0): Promise<any> {
    const url = 'v1/me/library/songs';
    return this.fetchLibPage(url, offset);
  }

  async fetchLibPage(url: string, offset: number) {
    const res = await this.musicKitInstance.api.music(url, {
      offset,
      limit: 100,
      'art[url]': 'f',
    });
    return res.data;
  }

  parseNext(next: string, fallback = 0): number {
    return next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;
  }

  fetchPage(
    url: string,
    offset: number,
  ): Observable<{ collection: any[]; offset: number; total: number }> {
    return from(this.musicKitInstance.api.music(url, { offset })).pipe(
      map(({ data }: any) => {
        return {
          collection: data.data,
          offset: this.parseNext(data.next),
          total: data.meta.total,
        };
      }),
    );
  }

  async fetchLibraryAlbums(offset = 0): Promise<any> {
    const res = await this.musicKitInstance.api.music('v1/me/library/albums', {
      offset,
      'art[url]': 'f',
    });
    return res.data;
  }

  async fetchLibraryAlbum(id: string): Promise<any> {
    const req = await this.musicKitInstance.api.music(
      `v1/me/library/albums/${id}`,
      {
        'art[url]': 'f',
        'format[resources]': 'map',
        include: 'catalog',
        'include[albums]': 'tracks',
      },
    );
    return req.data.resources;
  }

  fetchLibraryArtists(offset: number): Observable<any> {
    return from(
      this.musicKitInstance.api.library.artists(null, {
        limit: 100,
        offset,
        'art[url]': 'f',
      }),
    );
  }
  fetchLibraryArtist(id: string): Observable<any> {
    return from(
      this.musicKitInstance.api.library.artist(id, {
        include: 'albums',
        'art[url]': 'f',
      }),
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
        'art[url]': 'f',
      }),
    ).pipe(
      map((results: any) => ({
        songResults: results.songs.data,
        albumResults: results.albums.data,
        artistResults: results.artists.data,
        playlistResults: results.playlists.data,
      })),
    );
  }
  async fetchLibraryPlaylist(id: string): Promise<any> {
    const res = await this.musicKitInstance.api.music(
      `v1/me/library/playlists/${id}`,
    );
    return res.data.data[0];
  }

  async fetchLibraryPlaylistTracks(id: string): Promise<any> {
    const res = await this.musicKitInstance.api.music(
      `v1/me/library/playlists/${id}/tracks`,
    );
    return res.data.data;
  }

  async fetchLibrarySong(id: string): Promise<any> {
    try {
      await this.musicKitInstance.api.music(`v1/me/library/songs/${id}`);
      return true;
    } catch (e) {
      return false;
    }
  }

  async addToLibrary(id: string, type: string) {
    const loader = await this.toastCtrl.create({
      cssClass: 'loader-add-to-library',
      message: 'Added to Library',
      icon: checkmarkCircle,
      duration: 2000,
    });
    await this.musicKitInstance.addToLibrary(id, type);
    await loader.present();
  }

  async deleteFromLibrary(href: string) {
    console.log(href);
    // await this.musicKitInstance.api.music(href, {}, { fetchOptions: { method: "DELETE" } })
  }
  async fetchRecentlyAdded(offset = 0): Promise<any> {
    const res = await this.musicKitInstance.api.music(
      'v1/me/library/recently-added',
      {
        limit: 25,
        offset,
      },
    );
    return res.data;
  }

  async playNext(type: string, id: string) {
    const addNext = {};
    addNext[type] = id;
    const loader = await this.toastCtrl.create({
      cssClass: 'loader-play-next',
      message: 'Playing Next',
      icon: list,
      duration: 2000,
    });

    await this.musicKitInstance.playNext(addNext);
    await loader.present();
  }

  async fetchCompleteAlbum(id: string): Promise<any> {
    const {
      data: { data: res },
    }: { data: { data: [Album] } } = await this.musicKitInstance.api.music(
      `v1/catalog/${this.musicKitInstance.storefrontId}/albums/${id}`,
      { 'art[url]': 'f', relate: 'library' },
    );
    const albumRes = res[0];
    console.log(albumRes);
  }

  async fetchRecomendations() {
    const queryParameters = {
      l: 'en-us',
      'art[url]': 'f',
      'format[resources]': 'map',
    };
    const res = await this.musicKitInstance.api.music(
      `/v1/me/recommendations`,
      queryParameters,
    );
    return res.data.resources;
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
