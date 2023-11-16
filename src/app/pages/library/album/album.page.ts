import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Album } from 'src/@types/album';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { PreviewHeaderComponent } from '../../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../../providers/player/player.service2';
import { Song } from '../../../../@types/song';
import { LibraryAlbum } from '../../../../@types/library-album';

@Component({
  selector: 'app-library-albums',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    RouterModule,
    JsonPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonBackButton,
    IonContent,
    IonList,
    IonThumbnail,
    IonItem,
    IonLabel,
    IonSkeletonText,
  ],
})
export class AlbumPage {
  private api = inject(MusickitService);
  private route = inject(ActivatedRoute);
  private player = inject(PlayerService);

  public hasError = signal(false);
  public libraryAlbum = signal<Partial<Album>>(null);
  public librarySongs = signal<Array<Song>>(null);
  public albumData = signal<Partial<Album>>(null);

  public canShare = !!('share' in navigator);
  showCompleteAlbum = signal(false);

  async ionViewDidEnter() {
    const id = this.route.snapshot.params.id;
    const data = await this.api.fetchLibraryAlbum(id);

    const albumData = data['library-albums'][id];
    const libraryTracks = Object.values(data['library-songs']).sort(
      (a: Song, b: Song) => a.attributes.trackNumber - b.attributes.trackNumber,
    );

    if (libraryTracks < Object.values(data.songs)) {
      this.showCompleteAlbum.set(true);
      this.albumData.set(Object.values(data.albums)[0]);
    }

    this.libraryAlbum.set(albumData);
    this.librarySongs.set(libraryTracks);
  }

  playSong(index: number, shuffle = false) {
    const { type } = this.libraryAlbum();
    this.player.playAlbum(type, this.route.snapshot.params.id, index, shuffle);
  }
  playAlbum({ shuffle }) {
    this.playSong(0, shuffle);
  }
  delete() {
    // const { href } = this.collection();
    // this.api.deleteFromLibrary(href);
  }
}
