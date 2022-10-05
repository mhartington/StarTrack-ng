import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMapTo } from 'rxjs/operators';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { RxState } from '@rx-angular/state';
import { mapToResults, mapToError } from '../../util/fetchUtils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { LetModule } from '@rx-angular/template';
import { ErrorComponent } from '../../components/error/error.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { AlbumPreviewItemsComponent } from '../../components/album-preview-items/album-preview-items.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { RouterModule } from '@angular/router';
import { useState } from 'src/app/util/useState';

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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongItemComponent,
    AlbumPreviewItemsComponent,
    FormatArtworkUrlPipe,
    ErrorComponent,
    LetModule,
    LazyImgComponent,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowsePage {
  public state$: Observable<IBrowsePageState> = this.stateService.select();
  // public state = useState<IBrowsePageState>({
  //   isLoading: true,
  //   hasError: false,
  //   collection: null,
  // });
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
    this.stateService.set({
      isLoading: true,
      hasError: false,
      collection: null,
    });
    this.stateService.connect(
      this.ionViewDidEnter$.pipe(switchMapTo(this.fetchDataStream$))
    );
  }
  // ngOnInit(){
  //   this.stateService.connect(this.fetchDataStream$);
  // }
  trackByItem(_idx: number, item: any) {
    return item.id;
  }
  ionViewDidEnter() {
    this.ionViewDidEnter$.next(null);
    this.ionViewDidEnter$.complete();
  }
  playSong(index: number) {
    this.player.setQueueFromItems(
      this.stateService.get().collection.topSongs,
      index
    );
  }
}
