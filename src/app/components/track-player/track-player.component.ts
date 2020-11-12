import { Component, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  PlaybackStates,
  PlayerService,
} from '../../providers/player/player.service2';
import { PlayerModalComponent } from '../player-modal/player-modal.component';

@Component({
  selector: 'track-player',
  templateUrl: './track-player.component.html',
  styleUrls: ['./track-player.component.scss'],
})
export class TrackPlayerComponent {
  public playbackStates = PlaybackStates;
  public state$ = this.player.select();
  public queue$ = this.player.select('queue');

  private _playerModal: typeof PlayerModalComponent;
  click_block = false;

  constructor(
    public player: PlayerService,
    private modalCtrl: ModalController
  ) {}

  @HostListener('click')
  async toggle() {
    if (!this._playerModal && !this.click_block) {
      this.click_block = true;
      const { PlayerModalComponent } = await import(
        '../player-modal/player-modal.component'
      );
      this._playerModal = PlayerModalComponent;
    }

    const modalInstance = await this.modalCtrl.create({
      component: this._playerModal,
      swipeToClose: false,
      cssClass: 'full-modal',
    });
    await modalInstance.present();
    this.click_block = false;
  }
  seekToTime(time: number): void {
    this.player.seekToTime(time);
  }
  async togglePlay(e: any): Promise<void> {
    this.stopProp(e);
    if (this.player.get().playbackState === this.playbackStates.PAUSED) {
      await this.player.play();
    } else {
      await this.player.pause();
    }
  }
  playAtIndex(e: any, i: number) {
    this.stopProp(e);
    this.player.skipTo(i);
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
