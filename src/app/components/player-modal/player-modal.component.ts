import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
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

  private playbackTime$ = this.player.select('playbackTime');
  public playbackTime = 0;

  clickBlock = false;
  isScrubbing = false;

  constructor(
    private modalCtrl: ModalController,
    public player: PlayerService
  ) {
    this.playbackTime$
      .pipe(
        tap((val: any) => {
          if (!this.isScrubbing) {
            this.playbackTime = val;
          }
        })
      )
      .subscribe();
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
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
