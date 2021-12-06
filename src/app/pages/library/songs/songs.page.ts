import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { insert, RxState } from '@rx-angular/state';
import { EMPTY, Observable, Subject } from 'rxjs';
import { map, switchMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';
import { Song } from 'src/@types/song';
import { MusickitService } from 'src/app/providers/musickit-service/musickit-service.service';
import { PlayerService } from 'src/app/providers/player/player.service2';

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
  providers: [RxState]
})
export class SongsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public scrollTrigger$ = new Subject();
  public songs$: Observable<Song[]> = this.stateService.select('songs');


  public fetchMore$ = this.scrollTrigger$.pipe(
    withLatestFrom(this.stateService.$),
    switchMap(([_, { songs, total }]) => {
      if (songs.length === total) {
        this.infiniteScroll.complete();
        this.infiniteScroll.disabled = true;
        return EMPTY;
      }
      return this.api.fetchLibrarySongs(this.stateService.get('offset'));
    }),
    tap(() => this.infiniteScroll.complete())
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
    }

  ngOnInit() {
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchLibrarySongs$))
    );

    this.stateService.connect(
      this.fetchMore$,
      ({ total, songs }, { data, next }) => ({
        songs: insert(songs, data),
        offset: parseNext(next, total),
      })
    );
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next();
    this.ionViewDidEnter$.complete();
  }


  playSong(index: number, shuffle = false) {
    const songs = this.stateService.get('songs');
    this.player.playCollection({songs, startPosition: index});
  }

}
