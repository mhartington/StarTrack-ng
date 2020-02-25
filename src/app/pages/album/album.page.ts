import { Component, ɵdetectChanges as markForChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  switchMap,
  map,
  switchMapTo,
  debounceTime,
} from 'rxjs/operators';
import { AlbumModel } from '../../../@types/album-model';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { Observable, Subject, of } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { mapToError, mapToAlbumResults } from 'src/app/util/fetchUtils';

interface IAlbumPageState {
  collection: Partial<AlbumModel>;
  isLoading: boolean;
  hasError: boolean;
  canShare: boolean;
}
@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  providers: [RxState],
})
export class AlbumPage {
  public state$: Observable<IAlbumPageState> = this.stateService.select();

  private ionViewDidEnter$ = new Subject<boolean>();
  private fetchDataStream$ = this.route.params.pipe(
    switchMap(({ type, id }) => this.api.fetchAlbumOrPlaylist(type, id)),
    debounceTime(500),
    map(mapToAlbumResults),
    catchError((e) => of(mapToError(e)))
  );

  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
    private player: PlayerService,
    private stateService: RxState<IAlbumPageState>
  ) {
    this.stateService.set({ isLoading: true, hasError: false });
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchDataStream$))
    );
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next();
  }
  playSong(index: number) {
    this.player.setQueueFromItems(
      Array.from(this.stateService.get().collection.relationships.tracks.data),
      index
    );
  }
  playAlbum({ shuffle }) {
    let index: number;
    if (shuffle) {
      this.player.toggleShuffle(shuffle);
      const tracks = this.stateService.get().collection.relationships.tracks
        .data;
      index = Math.floor(Math.random() * Math.floor(tracks.length));
    } else {
      index = 0;
    }
    this.playSong(index);
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
