import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-library-albums',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,

  imports: [
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
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
    RouterLink,
  ],
})
export class AlbumPage {
  private api = inject(MusickitService);
  private player = inject(PlayerService);

  public hasError = signal(false);
  public libraryAlbum = signal<Partial<Album>>(null);
  public librarySongs = signal<Array<Song>>(null);
  public albumData = signal<Partial<Album>>(null);

  public canShare = !!('share' in navigator);
  showCompleteAlbum = signal(false);


  private id = input('')
  constructor(){
    effect(() => {
      this.fetchAlbum(this.id());
    })
  }

  async fetchAlbum(id: string) {
    const data = await this.api.fetchLibraryAlbum(id);
    const albumData = data['library-albums'][id];
    const libraryTracks = Object.values(data['library-songs']).sort(
      (a: Song, b: Song) => a.attributes.trackNumber - b.attributes.trackNumber,
    );
    if (data.songs && libraryTracks < Object.values(data.songs)) {
      this.showCompleteAlbum.set(true);
      this.albumData.set(Object.values(data.albums)[0]);
    }
    this.libraryAlbum.set(albumData);
    this.librarySongs.set(libraryTracks);
  }

  playSong(index: number, shuffle = false) {
    const album = this.libraryAlbum().id;
    this.player.playCollection({ album, startWith: index, shuffle });
  }
  playAlbum({ shuffle }) {
    this.playSong(0, shuffle);
  }
}
