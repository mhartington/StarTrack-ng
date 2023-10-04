import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { PreviewHeaderComponent } from '../../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { PlayerService } from '../../../providers/player/player.service2';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import { Album } from 'src/@types/album';
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

@Component({
  selector: 'app-library-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    RouterModule,
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
  private route = inject(ActivatedRoute);
  private player = inject(PlayerService);

  public hasError = signal(false);
  public collection = signal<Partial<Album>>(null);
  public collectionTracks = signal<Partial<Album>>(null);
  public playlistTracks = signal(null);

  public canShare = !!('share' in navigator);

  async ionViewDidEnter() {
    const id = this.route.snapshot.params.id;
    const [playlistInfo, playlistTracks] = await Promise.all([
      await this.api.fetchLibraryPlaylist(id),
      await this.api.fetchLibraryPlaylistTracks(id),
    ]);
    this.collection.set(playlistInfo);
    this.playlistTracks.set(playlistTracks);
  }

  playSong(index: number, shuffle = false) {
    this.player.playPlaylist(this.route.snapshot.params.id, index, shuffle);
  }
  playAlbum({ shuffle }) {
    this.playSong(0, shuffle);
  }
  delete() {
    const { href } = this.collection();
    this.api.deleteFromLibrary(href);
  }
}
