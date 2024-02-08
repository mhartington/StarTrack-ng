import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusBar, Style } from '@capacitor/status-bar';

import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import {
  PlaybackStates,
  PlayerService,
  RepeatMode,
} from '../../providers/player/player.service2';
import { BackgroundGlowComponent } from '../background-glow/background-glow';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
import { NowPlayingArtworkComponent } from '../now-playing-artwork/now-playing-artwork.component';
import { SongItemComponent } from '../song-item/song-item.component';
import { QueueListComponent } from '../queue-list/queue-list.component';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRange,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonToolbar,
  ModalController,
  PopoverController,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  playForward,
  play,
  pause,
  playBack,
  volumeOff,
  volumeHigh,
  list,
  repeat,
  shuffle,
  ellipsisHorizontal,
} from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';
import {
  MsToMinsPipe,
  SecondsToMins,
} from '../../pipes/ms-to-mins/ms-to-mins.pipe';
import { NowPlayingContextMenuComponent } from '../now-playing-context-menu/now-playing-context-menu.component';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SongItemComponent,
    FormsModule,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    NowPlayingArtworkComponent,
    BackgroundGlowComponent,
    MsToMinsPipe,
    SecondsToMins,
    QueueListComponent,
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonRange,
    IonLabel,
    IonSpinner,
    IonFooter,
    IonToolbar,
    IonText,
    IonContent,
    IonThumbnail,
  ],
})
export class PlayerModalComponent {
  @ViewChild('wrapper') wrapper: ElementRef<HTMLElement>;

  private modalCtrl = inject(ModalController);
  private isScrubbing = false;
  private _playbackTime: number;

  public player = inject(PlayerService);

  public playbackStates = PlaybackStates;
  public repeatMode = RepeatMode;

  public queue = this.player.upNext;

  public showQueue = false;

  constructor() {
    addIcons({
      list,
      play,
      pause,
      playBack,
      playForward,
      volumeHigh,
      shuffle,
      volumeOff,
      repeat,
      ellipsisHorizontal,
    });
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  get volume() {
    return this.player.volume();
  }

  get playbackTime() {
    if (this.isScrubbing) {
      return this._playbackTime;
    } else {
      return this.player.playbackTime();
    }
  }
  set playbackTime(val: number) {
    this._playbackTime = val;
  }

  async seekToTime(ev: any): Promise<void> {
    this.stopProp(ev);
    await this.player.seekToTime(ev.target.value);
    this.isScrubbing = false;
  }
  pauseSeeking(ev: any): void {
    this.stopProp(ev);
    this.isScrubbing = true;
    this.playbackTime = ev.target.value;
  }

  async togglePlay(e: any): Promise<void> {
    this.stopProp(e);
    await this.player.togglePlay();
  }
  playAtIndex(e: any) {
    this.stopProp(e.$event);
    const parent: HTMLElement = e.$event.target.closest('.queue-scroller');
    parent.scrollTo({ top: 0, behavior: 'smooth' });
    this.player.skipTo(e.song);
  }

  stopProp(e: any): void {
    e.stopPropagation();
  }
  async next(e: any): Promise<void> {
    this.stopProp(e);
    await this.player.skipToNextItem();
  }
  async prev(e: any): Promise<void> {
    this.stopProp(e);
    await this.player.skipToPreviousItem();
  }
  async toggleQueue() {
    this.showQueue = !this.showQueue;
    await import('./player-modal.animation').then((m) =>
      m.createQueueAnimation(this.wrapper.nativeElement, this.showQueue),
    );
  }
  toggleShuffle(shuffleMode: boolean) {
    this.player.toggleShuffle(!shuffleMode);
  }
  toggleRepeatMode() {
    this.player.toggleRepeat();
  }

  setVol(e: any) {
    this.player.volume.set(e.detail.value);
  }
  ionViewWillEnter() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
    }
  }
  ionViewWillLeave() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Default });
    }
  }

  private popoverCtrl = inject(PopoverController);
  async showNowPlayingContext(event) {
    const popover = await this.popoverCtrl.create({
      component: NowPlayingContextMenuComponent,
      event,
      side: 'top',
    });
    await popover.present();
  }
}
