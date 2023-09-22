import { Component, inject, signal } from '@angular/core';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { AlbumPreviewItemsComponent } from '../../components/album-preview-items/album-preview-items.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SongItemComponent,
    AlbumPreviewItemsComponent,
    FormatArtworkUrlPipe,
    LazyImgComponent,
    RouterModule,
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
  trackByItem(_idx: number, item: any) {
    return item.id;
  }
  async ionViewDidEnter() {
    const data = await this.api.fetchChart();
    this.state.update(() => ({
      isLoading: false,
      hasError: false,
      collection: data,
    }));
  }
  playSong(index: number) {
    this.player.setQueueFromItems(this.state().collection.topSongs, index);
  }
}
