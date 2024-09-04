import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../components/error/error.component';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonIcon,
  IonList,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { share } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Playlist } from '../../../@types/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonThumbnail,
    IonBackButton,
    IonButton,
    IonContent,
    IonIcon,
    IonList,
    IonRouterOutlet,
  ],
})
export class PlaylistPage {
  private api = inject(MusickitService);
  private player = inject(PlayerService);

  public collection = signal<Playlist>(null);
  public canShare = !!('share' in navigator);

  public id = input('');

  constructor() {
    addIcons({ share });
    effect(() => {
      this.fetchPlaylist();
    });
  }
  async fetchPlaylist() {
    const data = await this.api.fetchPlaylist(this.id());
    this.collection.set(data);
  }
  playSong(startWith: number, shuffle = false) {
    const playlist = this.collection().id;
    this.player.playCollection({ shuffle, playlist, startWith });
  }
  playPlaylist({ shuffle }) {
    this.playSong(0, shuffle);
  }
  share() {
    const collection = this.collection();
    if (this.canShare) {
      navigator
        .share({
          title: 'Star Track',
          text: `Check out "${collection.attributes.name}" by ${collection.attributes.curatorName}. Via Star Track.`,
          url: `${window.location.origin}/album/${collection.id}`,
        })
        .then(() => console.log('Successful share'));
    }
  }
}
