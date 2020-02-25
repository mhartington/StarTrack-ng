import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMapTo } from 'rxjs/operators';
import { DetailModalComponent } from 'src/app/components/detail-modal/detail-modal.component';
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
  private ionViewDidEnter$ = new Subject<boolean>();
  public state$: Observable<IBrowsePageState> = this.stateService.select();

  private fetchDataStream$ = this.api.fetchChart().pipe(
    map(mapToResults),
    catchError((e) => of(mapToError(e)))
  );

  constructor(
    private api: MusickitService,
    private player: PlayerService,
    private modalCtrl: ModalController,
    private routerEl: IonRouterOutlet,
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
  ionViewDidEnter() {
    this.ionViewDidEnter$.next();
    this.ionViewDidEnter$.complete();
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      presentingElement: this.routerEl.nativeEl.closest('ion-split-pane'),
      swipeToClose: true,
    });
    await modal.present();
  }
  playSong(index: number) {
    this.player.setQueueFromItems(
      this.stateService.get().collection.topSongs,
      index
    );
  }
}
