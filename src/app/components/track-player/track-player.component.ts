import { Component, ElementRef, HostListener, inject } from '@angular/core';
import {
  PlaybackStates,
  PlayerService,
} from '../../providers/player/player.service2';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { CommonModule } from '@angular/common';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonFooter,
  IonIcon,
  IonLabel,
  IonNote,
  IonRange,
  IonSpinner,
  IonThumbnail,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playForward, play, pause, playBack } from 'ionicons/icons';

@Component({
  selector: 'track-player',
  templateUrl: './track-player.component.html',
  styleUrls: ['./track-player.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    CommonModule,
    PlayerModalComponent,
    IonFooter,
    IonThumbnail,
    IonLabel,
    IonNote,
    IonRange,
    IonButtons,
    IonButton,
    IonIcon,
    IonSpinner,
    IonToolbar
  ],
})
export class TrackPlayerComponent {
  public player = inject(PlayerService);
  private modalCtrl = inject(ModalController);
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  public isModalOpen = false;

  public playbackStates = PlaybackStates;
  private playerModal: typeof PlayerModalComponent;
  private clickBlock = false;
  private isScrubbing = false;
  private _playbackTime: any;

  constructor() {
    addIcons({ playForward, play, pause, playBack });
  }
  @HostListener('click')
  async toggle() {
    if (!this.playerModal && !this.clickBlock) {
      this.clickBlock = true;
      this.playerModal = await import(
        '../player-modal/player-modal.component'
      ).then((m) => m.PlayerModalComponent);
    }

    const modalInstance = await this.modalCtrl.create({
      component: this.playerModal,
      canDismiss: true,
      cssClass: 'full-modal',
      // presentingElement: this.el.nativeElement.closest('ion-split-pane'),
    });
    await modalInstance.present();
    this.clickBlock = false;
  }

  async seekToTime(ev: any): Promise<void> {
    this.stopProp(ev);
    await this.player.seekToTime(ev.target.value);
    this.isScrubbing = false;
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

  pauseSeeking(ev: any): void {
    this.stopProp(ev);
    this.isScrubbing = true;
    this.playbackTime = ev.target.value;
  }

  async togglePlay(e: any): Promise<void> {
    this.stopProp(e);
    await this.player.togglePlay();
  }
  stopProp(e: any): void {
    e.stopPropagation();
  }
  next(e: any): void {
    this.stopProp(e);
    this.player.skipToNextItem();
  }
  prev(e: any): void {
    this.stopProp(e);
    this.player.skipToPreviousItem();
  }
}
