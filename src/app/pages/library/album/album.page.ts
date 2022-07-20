import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RxState } from '@rx-angular/state';
import { LetModule, PushModule } from '@rx-angular/template';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { PreviewHeaderComponent } from '../../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../../components/song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { PlayerService } from '../../../providers/player/player.service2';
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

@Component({
  selector: 'app-library-albums',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  providers: [RxState],
  standalone: true,

  imports: [
    CommonModule,
    IonicModule,
    LetModule,
    PushModule,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    RouterModule,

  ],
})
export class AlbumPage implements OnInit {
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
  );

  constructor(
    private api: MusickitService,
    private stateService: RxState<Partial<AlbumPageState>>,
    private route: ActivatedRoute,
    private player: PlayerService
  ) {
    this.stateService.set(initialState);
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchLibraryAlbum$))
    );
  }

  ngOnInit(){
    this.ionViewDidEnter$.next(null);
    this.ionViewDidEnter$.complete();
  }

  playSong(index: number, shuffle = false) {
    this.player.playAlbum(this.route.snapshot.params.id, index, shuffle);
  }
  playAlbum({ shuffle }) {
    this.playSong(0, shuffle);
  }
  delete(){

  }
}
