import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  PlaybackStates,
  PlayerService,
} from 'src/app/providers/player/player.service2';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerModalComponent {
  public playbackStates = PlaybackStates;
  public state$ = this.player.select();
  public queue$ = this.player.select('queue');

  constructor(
    private modalCtrl: ModalController,
    public player: PlayerService
  ) {}
  async dismiss() {
    await this.modalCtrl.dismiss();
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
