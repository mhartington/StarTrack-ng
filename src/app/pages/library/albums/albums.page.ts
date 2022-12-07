import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';
import { RxState } from '@rx-angular/state';
import { insert } from '@rx-angular/cdk/transformations'
import { LetModule, PushModule } from '@rx-angular/template';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  map,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AlbumPreviewItemsComponent } from '../../../components/album-preview-items/album-preview-items.component';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
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
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    LetModule,
    PushModule,
    AlbumPreviewItemsComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,

  ],
})
export class AlbumsPage implements OnInit {
    private api = inject(MusickitService)
    private stateService = inject(RxState<AlbumsPageState>)
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public scrollTrigger$ = new Subject();

  public albums$: Observable<any[]> = this.stateService.select('albums');

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
    tap(res => console.log(res)),
    map((res: { data: any[]; next: string; meta: { total: number } }) => ({
      albums: res.data,
      offset: parseNext(res.next),
      total: res.meta.total,
    })),
    tap(() => (this.infiniteScroll.disabled = false))
  );
  private ionViewDidEnter$ = new Subject<boolean>();


  constructor(
  ) {
    this.stateService.set(initialState);
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchLibraryAlbums$))
    );
  }
  ngOnInit() {
    this.stateService.connect(
      this.fetchMore$,
      ({ total, albums }, { data, next }) => ({
        albums: insert(albums, data),
        offset: parseNext(next, total),
      })
    );
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next(null);
    this.ionViewDidEnter$.complete();
  }
}
