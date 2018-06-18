import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
// import { NativeMedia } from '../../providers/native-media/native-media';
import { Howl } from 'howler';
@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MusicCardComponent implements OnInit {
  public progressValue = 0;

  @Input() track: any;

  get fullImage() {
    return this.track.artworkUrl100.replace(/100x100bb/, '400x400bb');
  }
  animationQ;
  public ifPlaying = false;
  public isFavorite = false;
  public player: Howl;
  public isSeeking = false;
  // public nativeMedia: NativeMedia
  constructor() {}
  ngOnInit() {
    this.player = new Howl({
      src: [this.track.previewUrl],
      onplay: () => {
        this.animationQ = requestAnimationFrame(this.setProgress.bind(this));
      },
      onend: () => {
        this.playerEnded();
      }
    });
  }
  toggleSong() {
    if (this.ifPlaying) {
      this.stopSong();
    } else {
      this.playSong();
    }
  }
  playSong() {
    // this.nativeMedia.createMediaControls(this.track;
    this.player.play();
    this.ifPlaying = true;
  }
  stopSong() {
    this.ifPlaying = false;
    this.player.stop();
    this.progressValue = 0;
    window.cancelAnimationFrame(this.animationQ);
  }
  setProgress() {
    if (!this.isSeeking) {
      const seek: any = this.player.seek();
      this.progressValue = seek / this.player.duration() * 100 || 0;
      this.animationQ = requestAnimationFrame(this.setProgress.bind(this));
    }
  }
  seek(val) {
    this.isSeeking = false;
    const duration = this.player.duration();
    this.player.seek(duration * (val / 100));
    this.animationQ = requestAnimationFrame(this.setProgress.bind(this));
  }
  handleDrag() {
    this.isSeeking = true;
  }
  playerEnded() {
    this.ifPlaying = false;
  }
}
