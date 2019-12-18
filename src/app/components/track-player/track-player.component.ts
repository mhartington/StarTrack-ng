import { Component, OnInit } from '@angular/core';
import {
  PlayerService,
  PlaybackStates
} from '../../providers/player/player.service';

@Component({
  selector: 'track-player',
  templateUrl: './track-player.component.html',
  styleUrls: ['./track-player.component.scss']
})
export class TrackPlayerComponent implements OnInit {
  public playbackStates = PlaybackStates;
  constructor(public player: PlayerService) {}

  async ngOnInit() {
    await this.player.initPlayer();
  }
  get isLoading(): boolean {
    return (
      this.player.playbackState === this.playbackStates.LOADING ||
      this.player.playbackState === this.playbackStates.ENDED ||
      this.player.playbackState === this.playbackStates.WAITING ||
      this.player.playbackState === this.playbackStates.STALLED
    );
  }
  get isNotPlaying(): boolean {
    return this.player.playbackState === this.playbackStates.NONE;
  }
  get currentPlaybackDuration(): number {
    if (this.player.player) {
      return this.player.currentPlaybackDuration;
    } else {
      return 0;
    }
  }
  get currentPlaybackTime(): number {
    if (this.player.player) {
      return this.player.currentPlaybackTime;
    } else {
      return 0;
    }
  }

  seekToTime(time: number): void {
    this.player.seekToTime(time).subscribe();
  }
  togglePlay() {
    if (this.player.playbackState === this.playbackStates.PAUSED) {
      this.player.play().subscribe();
    } else {
      this.player.pause().subscribe();
    }
  }
  next() {
    this.player.skipToNextItem().subscribe();
  }
  prev() {
    this.player.skipToPreviousItem().subscribe();
  }
}
