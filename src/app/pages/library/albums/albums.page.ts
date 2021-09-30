import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';

type AlbumsPageState = {
  albums: any[];
  offset: number;
};

@Component({
  selector: 'app-library-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  providers: [RxState],
})
export class AlbumsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public state$: Observable<AlbumsPageState> = this.stateService.select();
  public scrollTrigger$ = new Subject();

  public fetchMore$ = this.scrollTrigger$.pipe(
    switchMap(() =>
      this.api.fetchLibraryAlbums(this.stateService.get('offset'))
    ),
    tap(() => this.infiniteScroll.complete())
  );

  private fetchLibraryAlbums$ = this.api.fetchLibraryAlbums().pipe(
    map((res: { data: any[]; next: string }) => ({
      albums: res.data,
      offset: parseInt(res.next.match(/\d*$/)[0], 10),
    })),
    tap(() => (this.infiniteScroll.disabled = false))
  );
  private ionViewDidEnter$ = new Subject<boolean>();
  constructor(
    private api: MusickitService,
    private stateService: RxState<AlbumsPageState>
  ) {
    this.stateService.set({
      albums: [],
      offset: 0,
    });
  }

  ngOnInit() {
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchLibraryAlbums$))
    );

    this.stateService.connect(this.fetchMore$, (oldState, newState) => ({
      albums: [...oldState.albums, ...newState.data],
      offset: parseInt(newState.next.match(/\d*$/)[0], 10),
    }));
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next();
    this.ionViewDidEnter$.complete();
  }
}
