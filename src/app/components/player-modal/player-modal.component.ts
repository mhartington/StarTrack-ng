import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusBar, Style } from '@capacitor/status-bar';

import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import {
  PlaybackStates,
  PlayerService,
  RepeatMode,
} from '../../providers/player/player.service2';
import { BackgroundGlowComponent } from '../background-glow/background-glow';

import { NowPlayingArtworkComponent } from '../now-playing-artwork/now-playing-artwork.component';

import { QueueListComponent } from '../queue-list/queue-list.component';
import {
  IonBadge,
  IonButton,
  IonButtons,
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
  RangeCustomEvent,
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
import { SecondsToMins } from '../../pipes/ms-to-mins/ms-to-mins.pipe';
import { NowPlayingContextMenuComponent } from '../now-playing-context-menu/now-playing-context-menu.component';
import { Song } from '../../../@types/song';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FormatArtworkUrlPipe,
    NowPlayingArtworkComponent,
    BackgroundGlowComponent,
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
    IonThumbnail,
  ],
})
export class PlayerModalComponent {
  wrapper = viewChild<ElementRef<HTMLElement>>('wrapper');
  public player = inject(PlayerService);
  private popoverCtrl = inject(PopoverController);
  private modalCtrl = inject(ModalController);
  private isScrubbing = false;
  private _playbackTime: number;

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
    }
    return this.player.playbackTime();
  }
  set playbackTime(val: number) {
    this._playbackTime = val;
  }

  async seekToTime(ev: RangeCustomEvent): Promise<void> {
    this.stopProp(ev);
    await this.player.seekToTime(ev.target.value as number);
    this.isScrubbing = false;
  }
  pauseSeeking(ev: RangeCustomEvent): void {
    this.stopProp(ev);
    this.isScrubbing = true;
    this.playbackTime = ev.target.value as number;
  }

  async togglePlay(e: MouseEvent): Promise<void> {
    this.stopProp(e);
    await this.player.togglePlay();
  }
  playAtIndex({ $event, song }: { $event: MouseEvent; song: Song }) {
    this.stopProp($event);
    const parent: HTMLElement = ($event.target as HTMLElement).closest(
      '.queue-scroller',
    );
    parent.scrollTo({ top: 0, behavior: 'smooth' });
    this.player.skipTo(song);
  }

  stopProp(e: MouseEvent | RangeCustomEvent): void {
    e.stopPropagation();
  }
  async next(e: MouseEvent): Promise<void> {
    this.stopProp(e);
    await this.player.skipToNextItem();
  }
  async prev(e: MouseEvent): Promise<void> {
    this.stopProp(e);
    await this.player.skipToPreviousItem();
  }
  async toggleQueue() {
    this.showQueue = !this.showQueue;
    await import('./player-modal.animation').then((m) =>
      m.createQueueAnimation(this.wrapper().nativeElement, this.showQueue),
    );
  }
  toggleShuffle(shuffleMode: boolean) {
    this.player.toggleShuffle(!shuffleMode);
  }
  toggleRepeatMode() {
    this.player.toggleRepeat();
  }

  setVol(e: RangeCustomEvent) {
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

  async showNowPlayingContext(event: MouseEvent) {
    const popover = await this.popoverCtrl.create({
      component: NowPlayingContextMenuComponent,
      event,
      side: 'top',
    });
    await popover.present();
  }
}
