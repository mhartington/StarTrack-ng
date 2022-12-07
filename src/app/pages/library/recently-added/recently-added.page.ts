import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';
import { RxState} from '@rx-angular/state';
import { insert } from '@rx-angular/cdk/transformations'
import { LetModule, PushModule } from '@rx-angular/template';
import { map, Subject, EMPTY} from 'rxjs';
import { AlbumPreviewItemsComponent } from 'src/app/components/album-preview-items/album-preview-items.component';
import { LazyImgComponent } from 'src/app/components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import {withLatestFrom, tap, switchMap, } from 'rxjs/operators';
type RecentlyAddedPageState = {
  albums: any[];
  offset: number;
  total: number;
};

const initialState = {
  albums: [],
  offset: 0,
};

const parseNext = (next: string, fallback: number = 0): number =>
  next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.page.html',
  styleUrls: ['./recently-added.page.scss'],
  providers: [RxState],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    LetModule,
    PushModule,
    RouterModule,
    AlbumPreviewItemsComponent,LazyImgComponent,FormatArtworkUrlPipe
  ],
})
export class RecentlyAddedPage implements OnInit {
private stateService = inject(RxState<RecentlyAddedPageState>);
private api = inject(MusickitService);

  public albums$ = this.stateService.select('albums');

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public scrollTrigger$ = new Subject();


  public fetchMore$ = this.scrollTrigger$.pipe(
    withLatestFrom(this.stateService.$),
    switchMap(([_, { albums, total }]) => {
      if (albums.length === total) {
        this.infiniteScroll.disabled = true;
        this.infiniteScroll.complete();
        return EMPTY;
      }
      return this.api.fetchRecentlyAdded(this.stateService.get('offset'));
    }),
    tap(() => this.infiniteScroll.complete())
  );

  private fetchRecent$ = this.api
    .fetchRecentlyAdded()
    .pipe(

    map((res: { data: any[]; next: string;}) => ({
      albums: res.data,
      offset: parseNext(res.next),
    })),
    tap(() => (this.infiniteScroll.disabled = false))
  );

  constructor(
  ) {
    this.stateService.set(initialState);
  }

  ngOnInit() {
    this.stateService.connect(this.fetchRecent$);

    this.stateService.connect(
      this.fetchMore$,
      ({ total, albums }, { data, next }) => ({
        albums: insert(albums, data),
        offset: parseNext(next, total),
      })
    );
  }
}
