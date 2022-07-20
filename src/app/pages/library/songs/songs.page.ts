import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';
import { insert, RxState } from '@rx-angular/state';
import { LetModule, PushModule } from '@rx-angular/template';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  map,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Song } from 'src/@types/song';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { SongItemComponent } from '../../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../../providers/player/player.service2';

const parseNext = (next: string, fallback: number = 0): number =>
  next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;

type SongsPageState = {
  songs: Partial<Song[]>;
  offset: number;
  total: number;
};

const initialState: SongsPageState = {
  songs: [],
  offset: 0,
  total: 0,
};

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
  providers: [RxState],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LetModule,
    PushModule,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
  ],
})
export class SongsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public scrollTrigger$ = new Subject();
  public songs$: Observable<Song[]> = this.stateService.select('songs');

  public fetchMore$ = this.scrollTrigger$.pipe(
    withLatestFrom(this.stateService.$),
    // switchMap(([_, { songs, total }]) => {
    //   if (songs.length === total) {
    //     this.infiniteScroll.complete();
    //     this.infiniteScroll.disabled = true;
    //     return EMPTY;
    //   }
      // return this.api.fetchLibrarySongs(this.stateService.get('offset'));
    // }),
    // tap(() => this.infiniteScroll.complete())
    tap(() => console.log('should end'))
  );

  private fetchLibrarySongs$ = this.api.fetchLibrarySongs().pipe(
    map((res: { data: any[]; next: string; meta: { total: number } }) => ({
      songs: res.data,
      offset: parseNext(res.next),
      total: res.meta.total,
    })),
    tap(() => (this.infiniteScroll.disabled = false))
  );
  private ionViewDidEnter$ = new Subject<boolean>();
  constructor(
    public stateService: RxState<SongsPageState>,
    private api: MusickitService,
    private player: PlayerService
  ) {
    this.stateService.set(initialState);
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchLibrarySongs$))
    );

    this.stateService.hold(
      this.fetchMore$
      // ,
      // ({ total, songs }, { data, next }) => ({
      //   songs: insert(songs, data),
      //   offset: parseNext(next, total),
      // })
    );
  }

  ngOnInit() {
    this.ionViewDidEnter$.next(null);
    this.ionViewDidEnter$.complete();
  }

  trackByItem(_idx: number, item: any) {
    return item.id;
  }

  playSong(index: number, shuffle = false) {
    const songs = this.stateService.get('songs');
    this.player.playCollection({ songs, startPosition: index });
  }
}
