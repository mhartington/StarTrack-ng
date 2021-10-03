import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RxState, insert } from '@rx-angular/state';
import { Observable, Subject, EMPTY } from 'rxjs';
import { filter, map, switchMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';
import { MusickitService, Result } from '../../../providers/musickit-service/musickit-service.service';

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

function parseNext(next: string, fallback: number = 0): number {
  return next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;
}

@Component({
  selector: 'app-library-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  providers: [RxState],
})
export class AlbumsPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public albums$: Observable<AlbumsPageState> = this.stateService.select('albums');
  public scrollTrigger$ = new Subject();

  public fetchMore$ = this.scrollTrigger$.pipe(
    withLatestFrom(this.stateService.$),
    switchMap((scrollTrigger, {albums, total, offset}) => {
      if (albums.length === total) {
        this.infiniteScroll.complete();
        this.infiniteScroll.disabled = true;
        return EMPTY;
      } 
      
      return this.api.fetchLibraryAlbums(offset);
    }),
    tap(() => this.infiniteScroll.complete())
  );

  private fetchInitial$ = this.api.fetchLibraryAlbums().pipe(
    map(({data, meta, next}: Result) => ({
      albums: data,
      offset: parseNext(next, meta.total),
      total: meta.total,
    })),
    tap(() => (this.infiniteScroll.disabled = false))
  );

  constructor(
    private api: MusickitService,
    private stateService: RxState<AlbumsPageState>
  ) {
    //                                            oldState       fetchedValue
    this.stateService.connect(this.fetchMore$, ({total, albums}, {data, next}) => ({
        albums: insert(albums, data),
        offset: parseNext(next, total),
      })
    );
  }

  ionViewDidEnter() {
    this.stateService.connect(this.fetchInitial$.pipe(startWith(initialState)));
  }
}
