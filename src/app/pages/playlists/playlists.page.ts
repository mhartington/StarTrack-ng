import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, switchMap, map, switchMapTo } from 'rxjs/operators';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { Observable, of, Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { mapToError, mapToAlbumResults } from '../../util/fetchUtils';
import { Playlist } from 'src/@types/playlist';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorComponent } from '../../components/error/error.component';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { LetModule, PushModule } from '@rx-angular/template';

interface IPlaylistPage {
  collection: Partial<Playlist>;
  isLoading: boolean;
  hasError: boolean;
  canShare: boolean;
}
@Component({
  selector: 'app-playlist',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    IonicModule,
    ErrorComponent,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
  ],
})
export class PlaylistPage {
  private api = inject(MusickitService);
  private route = inject(ActivatedRoute);
  private player = inject(PlayerService);

  public collection = signal(null);
  public canShare = !!('share' in navigator);

  async ionViewDidEnter() {
    const id = this.route.snapshot.params.id;
    const data = await this.api.fetchPlaylist(id);
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
