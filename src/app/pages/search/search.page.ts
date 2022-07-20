import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RxState } from '@rx-angular/state';
import { LetModule, PushModule } from '@rx-angular/template';
import { Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  mapTo,
  switchMap,
  take,
  tap,
  filter,
} from 'rxjs/operators';
import { Song } from 'src/@types/song';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { LazyImgComponent } from 'src/app/components/lazy-img/lazy-img.component';
import { SongItemComponent } from 'src/app/components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MsToMinsPipe } from 'src/app/pipes/ms-to-mins/ms-to-mins.pipe';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';

interface ICollection {
  songs?: any[];
  albums?: any[];
  playlists?: any[];
}
interface ISearchPageState {
  hasError: boolean;
  isLoading: boolean;
  collection: Partial<ICollection>;
}

const stateFixtures: { [key: string]: Partial<ISearchPageState> } = {
  idle: { isLoading: false, collection: null, hasError: false },
  error: { isLoading: false, hasError: true },
  loading: { isLoading: true },
  success: { isLoading: false, hasError: false },
};
const idleState = (state: Partial<ISearchPageState>) => ({
  ...state,
  ...stateFixtures.idle,
});
const errorState = (state: Partial<ISearchPageState>) => ({
  ...state,
  ...stateFixtures.error,
});
const loadingState = (state: Partial<ISearchPageState>) => ({
  ...state,
  ...stateFixtures.loading,
});
const successState = (state: Partial<ISearchPageState>, val: ICollection) => ({
  ...state,
  ...stateFixtures.success,
  collection: val,
});

@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [RxState],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    SongItemComponent,
    FormatArtworkUrlPipe,
    LazyImgComponent,
    ErrorComponent,
    MsToMinsPipe,
    ReactiveFormsModule,
    PushModule,
    LetModule,
    RouterModule
  ],
})
export class SearchPage {
  public state$: Observable<ISearchPageState> = this.stateService.select();
  public searchForm = this.fb.group({ search: '' });
  public searchClearTrigger$ = new Subject();
  public playSongTrigger$ = new Subject();

  public segmentFilter = new UntypedFormControl('songs');

  private searchTerm$ = this.searchForm.valueChanges.pipe(
    map(({ search }) => search),
    distinctUntilChanged()
  );

  private writeUrlEffect$ = this.searchTerm$.pipe(
    debounceTime(16),
    tap((term) => {
      const navExtras = term ? { queryParams: { query: term } } : {};
      this.router.navigate([], { ...navExtras });
    })
  );

  private readUrlEffect$ = this.route.queryParams.pipe(
    map(({ query }) => this.searchForm.setValue({ search: query ?? '' }))
  );

  private clearCollection$ = this.searchTerm$.pipe(
    filter((term) => !term),
    mapTo(idleState({}))
  );

  private fetchDataSideEffect$ = this.searchTerm$.pipe(
    filter((term) => !!term),
    debounceTime(500),
    tap(() => this.stateService.set(loadingState.bind(this))),
    switchMap((term) => this.api.search(term)),
    map((results) => successState({}, results)),
    catchError(() => of(errorState.bind(this)))
  );

  constructor(
    private stateService: RxState<ISearchPageState>,
    private api: MusickitService,
    private player: PlayerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {
    // UI Actions
    // Set init state
    this.stateService.set(idleState);
    // Listen to play button trigger
    this.stateService.hold(
      this.playSongTrigger$.pipe(tap(this.playSong.bind(this)))
    );
    // Listen to clear button trigger
    this.stateService.connect(
      this.searchClearTrigger$.pipe(mapTo(idleState.bind(this)))
    );
    this.stateService.connect(this.clearCollection$);
    // Data Actions
    // Read the url and set the search
    this.stateService.hold(this.readUrlEffect$.pipe(take(1)));
    // Write the url based on search
    this.stateService.hold(this.writeUrlEffect$);
    // Fetch some data
    this.stateService.connect(this.fetchDataSideEffect$);
  }

  playSong(song: Song): void {
    this.player.setQueueFromItems([song]);
  }
}
