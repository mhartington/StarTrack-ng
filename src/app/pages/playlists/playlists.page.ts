import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-playlist',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
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
  private route = inject(ActivatedRoute);
  private player = inject(PlayerService);

  public collection = signal(null);
  public canShare = !!('share' in navigator);

  // @Input() id: string = '';
  constructor() {
    addIcons({ share });
  }
  async ionViewDidEnter() {
    const id = this.route.snapshot.params.id;
    const data = await this.api.fetchPlaylist(id);
    console.log(data)
    this.collection.set(data);
  }

  playSong(startPosition: number, shuffle = false) {
    const { url } = this.collection().attributes;
    this.player.playCollection({ shuffle, url, startPosition });
  }
  playPlaylist({ shuffle }) {
    this.playSong(null, shuffle);
  }
  share() {
    const collection = this.collection();
    if (this.canShare) {
      (navigator as any)
        .share({
          title: 'Star Track',
          text: `Check out "${collection.attributes.name}" by ${collection.attributes.curatorName}. Via Star Track.`,
          url: `${window.location.origin}/album/${collection.id}`,
        })
        .then(
          () => console.log('Successful share'),
          (error: any) => console.log('Error sharing', error)
        );
    }
  }
}
