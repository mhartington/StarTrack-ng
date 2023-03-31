import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EMPTY } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Song } from 'src/@types/song';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { LazyImgComponent } from 'src/app/components/lazy-img/lazy-img.component';
import { SongItemComponent } from 'src/app/components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    SongItemComponent,
    FormatArtworkUrlPipe,
    LazyImgComponent,
    ErrorComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SearchPage {
  private api = inject(MusickitService);
  private player = inject(PlayerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public searchForm = new FormControl('');
  public segmentFilter = new FormControl('songs');

  public albums = signal(null);
  public playlists = signal(null);
  public songs = signal(null);
  public isLoading = signal(false);

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        filter((search) => !!search),
        debounceTime(500),
        tap((v) => {
          this.router.navigate([], { queryParams: { query: v } });
          this.isLoading.set(true);
          return v;
        }),
        switchMap((v) => this.api.search(v)),
        catchError(() => EMPTY)
      )
      .subscribe((results) => {
        this.albums.set(results?.albums);
        this.playlists.set(results?.playlists);
        this.songs.set(results?.songs);
        this.isLoading.set(false);
      });

    const qp = this.route.snapshot.queryParams.query;
    this.searchForm.setValue(qp ?? '');
  }

  playSong(song: Song): void {
    this.player.setQueueFromItems([song]);
  }
  clearSearch() {
    this.segmentFilter.setValue('songs');
    this.searchForm.setValue('');
    this.albums.set(null);
    this.playlists.set(null);
    this.songs.set(null);
    this.router.navigate([]);
  }
}
