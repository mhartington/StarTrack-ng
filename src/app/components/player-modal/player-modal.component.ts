import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import { Song } from 'src/@types/song';
import {
  PlaybackStates,
  PlayerService,
} from 'src/app/providers/player/player.service2';
import { createQueueAnimation } from './player-modal.animation';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerModalComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef<HTMLElement>;

  public backgroundColor: string;
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
  ngOnInit() {
}
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
  updateColor(
    event: [
      [number, number, number],
      [number, number, number],
      [number, number, number],
      [number, number, number],
      [number, number, number]
    ]
  ) {
    const primary = event[0];
    this.backgroundColor = `rgba(${primary[0]},${primary[1]},${primary[2]}, 0.5 )`;
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
  async toggleQueue() {
    this.showQueue = !this.showQueue;
    await createQueueAnimation(this.wrapper.nativeElement, this.showQueue);
  }
}
