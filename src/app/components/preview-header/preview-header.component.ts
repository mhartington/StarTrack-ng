import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  IonNote,
  IonText,
  IonModal,
  IonButton,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonContent,
  IonSkeletonText,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
import { play, shuffle } from 'ionicons/icons';
import { DatePipe } from '@angular/common';
import { Playlist } from '../../../@types/playlist';
import { Album } from '../../../@types/album';
import { PlayerService} from '../../providers/player/player.service2'
import { LibraryAlbum } from 'src/@types/library-album';
@Component({
  selector: 'preview-header',
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormatArtworkUrlPipe,
    LazyImgComponent,
    IonText,
    IonNote,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonContent,
    IonSkeletonText,
    IonIcon,
    DatePipe
  ],
})
export class PreviewHeaderComponent {

  playCollection = output<{shuffle: boolean}>()
  collection = input<Playlist | Album | LibraryAlbum>(null)

  bRate = inject(PlayerService).bitrate

  public showModal = signal(false);
  routerOutlet = inject(IonRouterOutlet).nativeEl;

  constructor() {
    addIcons({ play, shuffle });
  }
  togglePlay(shuffle = false): void {
    this.playCollection.emit({ shuffle });
  }
}
