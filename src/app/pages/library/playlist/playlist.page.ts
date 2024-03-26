import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { PreviewHeaderComponent } from '../../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { PlayerService } from '../../../providers/player/player.service2';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonList,
  IonThumbnail,
  IonSkeletonText,
  IonItem,
  IonLabel,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';
import { Playlist } from '../../../../@types/playlist';

@Component({
  selector: 'app-library-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,

  imports: [
    CommonModule,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonList,
    IonThumbnail,
    IonSkeletonText,
    IonItem,
    IonLabel,
    IonTitle,
    IonButtons,
  ],
})
export class PlaylistPage {
  private api = inject(MusickitService);
  private player = inject(PlayerService);

  public hasError = signal(false);
  public collection = signal<Playlist>(null);
  public collectionTracks = signal<Playlist>(null);
  public playlistTracks = signal(null);

  private id = input('')
  constructor(){
    effect(() => {
      this.fetchPlaylist(this.id());
    })
  }

  async fetchPlaylist(playlistId: string) {
    const [playlistInfo, playlistTracks] = await Promise.all([
      this.api.fetchLibraryPlaylist(playlistId),
      this.api.fetchLibraryPlaylistTracks(playlistId),
    ]);
    this.collection.set(playlistInfo);
    this.playlistTracks.set(playlistTracks);
  }

  playSong(index: number, shuffle = false) {
    const playlist = this.collection().id;
    this.player.playCollection({ playlist, startWith: index, shuffle });
  }
  playAlbum({ shuffle }) {
    this.playSong(0, shuffle);
  }
}
