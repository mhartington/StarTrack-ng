import { Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMapTo } from 'rxjs/operators';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { RxState } from '@rx-angular/state';
import { mapToResults, mapToError } from '../../util/fetchUtils';

interface IBrowsePageState {
  collection: any;
  isLoading: boolean;
  hasError: boolean;
}
@Component({
  selector: 'app-browse-page',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  providers: [RxState],
})
export class BrowsePage {
  public state$: Observable<IBrowsePageState> = this.stateService.select();

  private fetchDataStream$ = this.api.fetchChart().pipe(
    map(mapToResults),
    catchError((e) => of(mapToError(e)))
  );
  private ionViewDidEnter$ = new Subject<boolean>();
  constructor(
    private api: MusickitService,
    private player: PlayerService,
    private stateService: RxState<IBrowsePageState>
  ) {

    this.stateService.set({ isLoading: true, hasError: false, collection: null, });
    this.stateService.connect(this.ionViewDidEnter$.pipe(switchMapTo(this.fetchDataStream$)));

  }

  ionViewDidEnter() {
    this.ionViewDidEnter$.next();
    this.ionViewDidEnter$.complete();
  }
  playSong(index: number) {
    this.player.setQueueFromItems(
      this.stateService.get().collection.topSongs,
      index
    );
  }
}
