import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap, map, switchMapTo } from 'rxjs/operators';
import { Album } from '../../../@types/album';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { Observable, of, Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { mapToError, mapToAlbumResults } from '../../util/fetchUtils';

interface IAlbumPageState {
  collection: Partial<Album>;
  isLoading: boolean;
  hasError: boolean;
  canShare: boolean;
}
@Component({
  selector: 'app-playlist',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  providers: [RxState],
})
export class PlaylistPage {
  public state$: Observable<IAlbumPageState> = this.stateService.select();
  private ionViewDidEnter$ = new Subject<boolean>();

  private fetchDataStream$ = this.route.params.pipe(
    switchMap(({id }) => this.api.fetchPlaylist(id)),
    map(mapToAlbumResults),
    catchError((e) => of(mapToError(e)))
  );

  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
    private player: PlayerService,
    private stateService: RxState<IAlbumPageState>
  ) {
    this.stateService.set({
      isLoading: true,
      hasError: false,
      collection: null,
    });

    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchDataStream$))
    );
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next(null);
    this.ionViewDidEnter$.complete();
  }
  playSong(index: number, shuffle = false) {
    this.player.playPlaylist(this.route.snapshot.params.id, index, shuffle);
  }
  playPlaylist({ shuffle }) {
    this.playSong(0, shuffle);
  }
  share() {
    const { collection, canShare } = this.stateService.get();
    if (canShare) {
      (navigator as any)
        .share({
          title: 'Star Track',
          text: `Check out "${collection.attributes.name}" by ${collection.attributes.artistName}. Via Star Track.`,
          url: `${window.location.origin}/album/${collection.id}`,
        })
        .then(
          () => console.log('Successful share'),
          (error: any) => console.log('Error sharing', error)
        );
    }
  }
}
