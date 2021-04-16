import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
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
  collection: ICollection;
}

const stateFixtures: { [key: string]: Partial<ISearchPageState> } = {
  idle: { isLoading: false, collection: {}, hasError: false },
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
})
export class SearchPage {

  public state$: Observable<ISearchPageState> = this.stateService.select();
  public searchForm = this.fb.group({ search: '' });
  public searchClearTrigger$ = new Subject();
  public playSongTrigger$ = new Subject();

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
    private fb: FormBuilder
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

  playSong(index: number): void {
    this.player.setQueueFromItems(
      this.stateService.get().collection.songs,
      index
    );
  }
}
