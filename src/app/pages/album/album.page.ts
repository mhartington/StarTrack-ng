import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, switchMap, map, switchMapTo } from 'rxjs/operators';
import { Album } from '../../../@types/album';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { Observable, of, Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { mapToError, mapToAlbumResults } from '../../util/fetchUtils';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorComponent } from '../../components/error/error.component';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { LetModule, PushModule } from '@rx-angular/template';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';

interface IAlbumPageState {
  collection: Partial<Album>;
  isLoading: boolean;
  hasError: boolean;
  canShare: boolean;
}
@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  providers: [RxState],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ErrorComponent,
    PreviewHeaderComponent,
    SongItemComponent,
    LetModule,
    PushModule,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    RouterModule,
  ],
})
export class AlbumPage {
  public state$: Observable<IAlbumPageState> = this.stateService.select();
  private ionViewDidEnter$ = new Subject<boolean>();

  private fetchDataStream$ = this.route.params.pipe(
    switchMap(({ id }) => this.api.fetchAlbum(id)),
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
  playSong(startPosition: number, shuffle = false) {
    const { url } = this.stateService.get().collection.attributes;
    this.player.playCollection({ shuffle, url, startPosition });
  }
  playAlbum({ shuffle }) {
    this.playSong(null, shuffle);
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

  async addToLibrary() {
    const album = this.stateService.get('collection');
    await this.api.addToLibrary(album.id, album.type);
  }
}
