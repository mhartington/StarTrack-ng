import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

type AlbumPageState = {
  isloading: boolean;
  error: boolean;
  album: any;
};

const initialState: AlbumPageState = {
  album: null,
  isloading: true,
  error: false,
};
const parseNext = (next: string, fallback: number = 0): number =>
  next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;

@Component({
  selector: 'app-library-albums',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  providers: [RxState],
})
export class AlbumPage implements OnInit {
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public state$: Observable<Partial<AlbumPageState>> =
    this.stateService.select();
  private ionViewDidEnter$ = new Subject<boolean>();

  private fetchLibraryAlbum$ = this.route.params.pipe(
    switchMap(({ id }) => this.api.fetchLibraryAlbum(id)),
    map((results) => ({
      album: results,
      isloading: false,
      error: false,
    }))
    // map(mapToAlbumResults),
    // catchError((e) => of(mapToError(e)))
  );

  constructor(
    private api: MusickitService,
    private stateService: RxState<Partial<AlbumPageState>>,
    private route: ActivatedRoute
  ) {
    this.stateService.set(initialState);
  }

  ngOnInit() {
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchLibraryAlbum$))
    );

    //   this.stateService.connect(
    //     this.fetchMore$,
    //     ({ total, albums }, { data, next }) => ({
    //       albums: insert(albums, data),
    //       offset: parseNext(next, total),
    //     })
    //   );
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next();
    this.ionViewDidEnter$.complete();
  }
}
