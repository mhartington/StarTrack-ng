import {
  animate,
    group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import {
  PlaybackStates,
  PlayerService,
} from 'src/app/providers/player/player.service2';

const playerAnimation = trigger('playerAnimation', [
  // toggleing the queue to true
  transition('0 => 1', [
    group([
      query('.track-player', [
        style({ opacity: 0, transform: 'scale3d(0.8, 0.8, 0.8)' }),
        animate( '200ms ease-out', style({ opacity: 1, transform: 'scale3d(0, 0, 0);' })),
      ]),
      query(':enter', [
        style({ opacity: 0, transform: 'scale3d(0.8, 0.8, 0.8)' }),
        animate( '200ms ease-out', style({ opacity: 1, transform: 'scale3d(0, 0, 0);' })),
      ]),
    ]),
  ]),

  // toggleing the queue to false
  transition('1 => 0', [
    group([
      query(':leave', [
        animate( '200ms', style({ opacity: 0, transform: 'scale3d(0.8, 0.8, 0.8)' })),
      ]),
      query('.track-player', [
        animate( '200ms', style({ opacity: 0, transform: 'scale3d(0.8, 0.8, 0.8)' })),
      ]),
    ])
  ]),
]);
@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [playerAnimation],
})
export class PlayerModalComponent implements OnInit {
  public playbackStates = PlaybackStates;
  public state$ = this.player.select();
  public queue$ = this.player.select('queue');

  public playbackTime = 0;
  public showQueue = false;

  private playbackTime$ = this.player.select('playbackTime');
  private isScrubbing = false;
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
  ngOnInit() {}
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
  toggleQueue() {
    this.showQueue = !this.showQueue;
  }
}
