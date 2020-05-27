import {
  Component,
  HostBinding,
  HostListener,
  ɵmarkDirty as markDirty,
} from '@angular/core';
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
  @HostBinding('class.active') addClass = false;

  public playbackStates = PlaybackStates;
  public state$ = this.player.select();
  constructor(public player: PlayerService) {}
  @HostListener('click')
  toggle(): void {
    this.addClass = !this.addClass;
    markDirty(this);
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
