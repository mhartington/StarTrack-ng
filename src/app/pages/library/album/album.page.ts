import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonSkeletonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Album } from 'src/@types/album';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { PreviewHeaderComponent } from '../../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../../providers/player/player.service2';

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
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonBackButton, IonContent, IonList, IonThumbnail, IonItem, IonLabel, IonSkeletonText
  ],
})
export class AlbumPage {
  private api = inject(MusickitService);
  private route = inject(ActivatedRoute);
  private player = inject(PlayerService);

  public hasError = signal(false);
  public collection = signal<Partial<Album>>(null);

  public canShare = !!('share' in navigator);

  async ionViewDidEnter() {
    const id = this.route.snapshot.params.id;
    const data = await this.api.fetchLibraryAlbum(id);
    this.collection.set(data);
  }

  playSong(index: number, shuffle = false) {
    const { type } = this.collection();
    this.player.playAlbum(type, this.route.snapshot.params.id, index, shuffle);
  }
  playAlbum({ shuffle }) {
    this.playSong(0, shuffle);
  }
  delete() {
    const { href } = this.collection();
    this.api.deleteFromLibrary(href);
  }
}
