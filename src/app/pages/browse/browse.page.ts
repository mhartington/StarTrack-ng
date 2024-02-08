import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe, formatArtwork } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { AlbumPreviewItemsComponent } from '../../components/album-preview-items/album-preview-items.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { RouterLinkWithHref } from '@angular/router';
import { ErrorComponent } from '../../components/error/error.component';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Song } from '../../../@types/song';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SongItemComponent,
    AlbumPreviewItemsComponent,
    LazyImgComponent,
    ErrorComponent,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonThumbnail,
    IonListHeader,
    IonList,
    IonMenuButton,
    IonButtons,
    RouterLinkWithHref,
  ],
})
export class BrowsePage {
  private api = inject(MusickitService);
  private player = inject(PlayerService);

  public state = signal({
    isLoading: true,
    hasError: false,
    collection: null,
  });

  async ionViewDidEnter() {
    const data = await this.api.fetchChart();
    this.state.set({
      isLoading: false,
      hasError: false,
      collection: data,
    });
  }

  formartUrl(url:string){
    return formatArtwork(url, 200);
  }

  playSong(index: number) {
    const songs: Array<Song> = this.state().collection.topSongs;
    const songsToPlay = songs.map((song) => song.id);
    this.player.playCollection({ songs: songsToPlay, startWith: index });
  }
}
