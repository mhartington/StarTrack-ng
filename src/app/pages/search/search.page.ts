import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItemGroup,
  IonMenuButton,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { EMPTY, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Song } from '../../../@types/song';
import { ErrorComponent } from '../../components/error/error.component';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SongItemComponent,
    FormatArtworkUrlPipe,
    LazyImgComponent,
    ErrorComponent,
    ReactiveFormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonSpinner,
    IonSegment,
    IonSegmentButton,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonItemGroup,
    IonThumbnail,
  ],
})
export class SearchPage implements OnDestroy, OnInit {
  private api = inject(MusickitService);
  private player = inject(PlayerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private search$;

  public searchForm = new FormControl('');

  public segmentFilter = new FormControl('songs');

  public albums = signal(null);
  public playlists = signal(null);
  public songs = signal(null);
  public isLoading = signal(false);
  public recomendations = signal([]);

  constructor() {
    this.search$ = this.searchForm.valueChanges
      .pipe(
        filter((search) => !!search),
        debounceTime(500),
        // tap((v) => {
        //   this.router.navigate([], { queryParams: { query: v } });
        //   this.isLoading.set(true);
        //   return v;
        // }),
        // switchMap((v) => this.api.search(v)),
        switchMap((v) => this.api.searchSuggestions(v)),
        // catchError(() => EMPTY)
      ).subscribe();
      // .subscribe((results) => {
      //   this.albums.set(results?.albums);
      //   this.playlists.set(results?.playlists);
      //   this.songs.set(results?.songs);
      //   this.isLoading.set(false);
      // });

    // const qp = this.route.snapshot.queryParams.query;
    // this.searchForm.setValue(qp ?? '');

  }
  async ngOnInit(){
    console.log()
    // const data = await this.api.fetchRecomendations();
    // this.recomendations.set(data);
    // console.log(data)
  }
  

  playSong(song: Song): void {
    this.player.playCollection({song: song.id});
  }
  clearSearch() {
    this.segmentFilter.setValue('songs');
    this.searchForm.setValue('');

    this.albums.set(null);
    this.playlists.set(null);
    this.songs.set(null);

    this.router.navigate([]);
  }
  ngOnDestroy() {
    this.search$.unsubscribe();
  }
}
