import { Component } from '@angular/core';
import {
  PlayerService,
  PlaybackStates,
} from '../../providers/player/player.service2';


@Component({
  selector: 'track-player',
  templateUrl: './track-player.component.html',
  styleUrls: ['./track-player.component.scss'],
})
export class TrackPlayerComponent {
  public playbackStates = PlaybackStates;
  public state$ = this.player.select();
  constructor(public player: PlayerService) {}
  seekToTime(time: number): void {
    this.player.seekToTime(time);
  }
  async togglePlay() {
    if (this.player.get().playbackState === this.playbackStates.PAUSED) {
      await this.player.play();
    } else {
      await this.player.pause();
    }
  }
  next() {
    this.player.skipToNextItem();
  }
  prev() {
    this.player.skipToPreviousItem();
  }
}
