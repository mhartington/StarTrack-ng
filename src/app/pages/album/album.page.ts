import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Album } from '../../../@types/album';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorComponent } from '../../components/error/error.component';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ErrorComponent,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    RouterModule,
  ],
})
export class AlbumPage {
  private api = inject(MusickitService);
  private route = inject(ActivatedRoute);
  private player = inject(PlayerService);

  public isLoading = signal(true);
  public hasError = signal(false);
  public collection = signal<Partial<Album>>(null);

  public canShare = !!('share' in navigator);

  async ionViewDidEnter() {
    const id = this.route.snapshot.params.id;
    const data = await this.api.fetchAlbum(id);
    this.collection.set(data);
    this.isLoading.set(false);
  }
  playSong(startPosition: number, shuffle = false) {
    const url = this.collection().attributes.url;
    this.player.playCollection({ shuffle, url, startPosition });
  }
  playAlbum({ shuffle }) {
    this.playSong(null, shuffle);
  }
  share() {
    if (this.canShare) {
      (navigator as any)
        .share({
          title: 'Star Track',
          text: `Check out "${this.collection().attributes.name}" by ${this.collection().attributes.artistName}. Via Star Track.`,
          url: `${window.location.origin}/album/${this.collection().id}`,
        })
        .then(
          () => console.log('Successful share'),
          (error: any) => console.log('Error sharing', error)
        );
    }
  }

  async addToLibrary() {
    const album = this.collection();
    await this.api.addToLibrary(album.id, album.type);
  }
}
