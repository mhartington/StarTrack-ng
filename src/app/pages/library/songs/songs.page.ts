import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Song } from '../../../../@types/song';
import { parseNext } from '../../../util';

import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { SongItemComponent } from '../../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../../providers/player/player.service2';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonInfiniteScrollContent,
  IonThumbnail,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    IonThumbnail,
    IonButtons,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonInfiniteScrollContent,
  ],
})
export class SongsPage {
  private api = inject(MusickitService);
  private player = inject(PlayerService);
  private offset = 0;
  private total = 0;

  public songs = signal<Partial<Song[]>>([]);

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  async ionViewDidEnter() {
    this.songs().length === 0 ? this.fetchSongs() : null;
  }

  async fetchSongs() {
    const res = await this.api.fetchLibrarySongs(this.offset);
    this.offset = parseNext(res.next);
    this.total = res.meta.total;
    this.songs.update((s) => [...s, ...res.data]);
  }

  async fetchNext() {
    if (this.songs().length === this.total) {
      this.infiniteScroll.disabled = true;
      return;
    } else {
      await this.fetchSongs();
      this.infiniteScroll.complete();
    }
  }

  playSong(index: number) {
    const songs = this.songs();
    const songsToPlay = songs.map(song => song.id);
    this.player.playCollection({ songs: songsToPlay, startWith: index });
  }
}
