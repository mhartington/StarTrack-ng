import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { insert, RxState } from '@rx-angular/state';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  map,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';

type AlbumsPageState = {
  albums: any[];
  offset: number;
  total: number;
};

const initialState = {
  albums: [],
  offset: 0,
  total: 0,
};
const parseNext = (next: string, fallback: number = 0): number =>
  next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;

@Component({
  selector: 'app-library-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  providers: [RxState],
})
export class AlbumsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public albums$: Observable<any[]> = this.stateService.select('albums');
  public scrollTrigger$ = new Subject();

  public fetchMore$ = this.scrollTrigger$.pipe(
    withLatestFrom(this.stateService.$),
    switchMap(([_, { albums, total }]) => {
      if (albums.length === total) {
        this.infiniteScroll.disabled = true;
        this.infiniteScroll.complete();
        return EMPTY;
      }
      return this.api.fetchLibraryAlbums(this.stateService.get('offset'));
    }),
    tap(() => this.infiniteScroll.complete())
  );

  private fetchLibraryAlbums$ = this.api.fetchLibraryAlbums().pipe(
    map((res: { data: any[]; next: string; meta: { total: number } }) => ({
      albums: res.data,
      offset: parseNext(res.next),
      total: res.meta.total,
    })),
    tap(() => (this.infiniteScroll.disabled = false))
  );
  private ionViewDidEnter$ = new Subject<boolean>();


  constructor(
    private api: MusickitService,
    private stateService: RxState<AlbumsPageState>
  ) {
    this.stateService.set(initialState);
  }

  ngOnInit() {
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchLibraryAlbums$))
    );

    this.stateService.connect(
      this.fetchMore$,
      ({ total, albums }, { data, next }) => ({
        albums: insert(albums, data),
        offset: parseNext(next, total),
      })
    );
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next();
    this.ionViewDidEnter$.complete();
  }
}
