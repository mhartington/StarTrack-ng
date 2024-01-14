import { inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Song, SongAttributes } from 'src/@types/song';

import { LocalNotifications } from '@capacitor/local-notifications';
import { effect } from '@angular/core';

export type QueueOpts = {
  url?: string;
  shuffle?: boolean | false;
  startPosition?: number;
  startWith?: number;
  albums?: Array<string>;
  songs?: Array<string>;
  playlists?: Array<string>;
  album?: string;
  song?: string;
  playlist?: string;
};
export enum PlaybackStates {
  NONE,
  LOADING,
  PLAYING,
  PAUSED,
  STOPPED,
  ENDED,
  SEEKING,
  NULL,
  WAITING,
  STALLED,
  COMPLETED,
}
export enum RepeatMode {
  NONE,
  ONE,
  ALL,
}
const nowPlayingAttrs: Partial<SongAttributes> = {
  name: null,
  artistName: null,
  albumName: null,
  artwork: { url: 'assets/imgs/default.svg' },
};
const nowPlayingInit: any = {
  attributes: nowPlayingAttrs,
};

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private mkInstance = globalThis.MusicKit?.getInstance();
  private mkEvents = globalThis.MusicKit?.Events;
  private title = inject(Title);

  public bitrate = signal(256);
  public playbackState = signal(PlaybackStates.NONE);
  public queue = signal([]);
  public upNext = signal([]);
  public queuePosition = signal(0);
  public repeatMode = signal(0);
  public isShuffling = signal(false);
  public infiniteLoadTimeout = signal(null);
  public playbackDuration = signal(0);
  public playbackTime = signal(0);
  public playbackTimeRemaining = signal(0);
  public nowPlaying = signal(nowPlayingInit);
  public volume = signal(this.mkInstance.volume ?? 1);

  constructor() {
    this.mkInstance.addEventListener(this.mkEvents.mediaPlaybackError, () => {
      this.nowPlaying.set(nowPlayingInit);
      this.queue.set([]);
    });

    // Time has incremented
    this.mkInstance.addEventListener(
      this.mkEvents.playbackTimeDidChange,
      ({ currentPlaybackTime, currentPlaybackTimeRemaining }: never) => {
        this.playbackTime.set(currentPlaybackTime);
        this.playbackTimeRemaining.set(currentPlaybackTimeRemaining);
      },
    );

    // Song duration has changed
    this.mkInstance.addEventListener(
      this.mkEvents.playbackDurationDidChange,
      ({ duration }) => {
        this.playbackDuration.set(duration);
      },
    );
    // Play/Pause/Loading
    this.mkInstance.addEventListener(
      this.mkEvents.playbackStateDidChange,
      ({ state }) => {
        this.playbackState.set(state);
      },
    );

    // Now playing song changed
    this.mkInstance.addEventListener(
      this.mkEvents.nowPlayingItemDidChange,
      ({ item }) => {
        if (item) {
          this.nowPlaying.set(item);
          this.playbackTime.set(0);
          this.scheduleNotification();
        }
      },
    );

    // queue items changed
    this.mkInstance.addEventListener(this.mkEvents.queueItemsDidChange, () => {
      this.queue.set(this.mkInstance.queue.items);
      this.upNext.set(this.mkInstance.queue.unplayedUserItems.slice(1));
    });

    // queue position changed
    this.mkInstance.addEventListener(
      this.mkEvents.queuePositionDidChange,
      ({ position }) => {
        this.queuePosition.set(position + 1);
        this.upNext.set(this.mkInstance.queue.unplayedUserItems.slice(1));
      },
    );

    effect(() => {
      const playbackState = this.playbackState();
      const nowPlaying = this.nowPlaying();
      if (playbackState === PlaybackStates.PLAYING) {
        this.title.setTitle(
          `${nowPlaying.attributes.name}${
            nowPlaying.attributes.artistName
              ? ' • ' + nowPlaying.attributes.artistName
              : ''
          }`,
        );
      } else {
        this.title.setTitle('Star Track');
      }
    });

    effect(() => {
      this.mkInstance.volume = this.volume();
    });
  }

  // PLAYER METHODS
  async playCollection(opts: QueueOpts) {
    await this.mkInstance.setQueue(opts);
    this.toggleShuffle(opts.shuffle);
    await this.play();
  }

  async play() {
    await this.mkInstance.play();
  }
  async pause() {
    await this.mkInstance.pause();
  }
  async stop() {
    await this.mkInstance.stop();
  }
  async togglePlay() {
    if (this.mkInstance.playbackState === PlaybackStates.PAUSED) {
      await this.play();
    } else {
      await this.pause();
    }
  }

  toggleRepeat(): void {
    // const nextRepeatMode = (this.mkInstance.repeatMode + 1) % 3;
    let nextRepeatMode: RepeatMode;
    const currentMode = this.mkInstance.repeatMode;
    if (currentMode === RepeatMode.NONE) {
      nextRepeatMode = RepeatMode.ALL;
    } else if (currentMode === RepeatMode.ALL) {
      nextRepeatMode = RepeatMode.ONE;
    } else if (currentMode === RepeatMode.ONE) {
      nextRepeatMode = RepeatMode.NONE;
    }
    this.mkInstance.repeatMode = nextRepeatMode;
    this.repeatMode.set(this.mkInstance.repeatMode);
  }
  toggleShuffle(shouldShuffle: boolean): void {
    this.mkInstance.shuffle = shouldShuffle;
    this.isShuffling.set(this.mkInstance.shuffleMode);
  }
  async skipToNextItem() {
    await this.stop();
    const repeatMode = this.repeatMode();
    if (repeatMode === 1) {
      return await this.seekToTime(0);
    }
    return await this.mkInstance.skipToNextItem();
    // if ((document as any)?.startViewTransition) {
    //   (document as any).startViewTransition(async () => {
    //   });
    // }
  }
  async skipToPreviousItem() {
    await this.stop();
    const repeatMode = this.repeatMode();
    if (repeatMode === 1) {
      return await this.seekToTime(0);
    }
    return await this.mkInstance.skipToPreviousItem();
    // if ((document as any)?.startViewTransition) {
    //   (document as any).startViewTransition(async () => {
    //   });
    // }
  }
  async seekToTime(time: number) {
    await this.mkInstance.seekToTime(time);
  }
  async skipTo(song: Song) {
    const index = this.queue().indexOf(song);
    await this.stop();
    await this.mkInstance.changeToMediaAtIndex(index);
    // if ((document as any)?.startViewTransition) {
    //   (document as any).startViewTransition(async () => {
    //   });
    // }
  }

  // playNext(item: SongModel): void {
  //   this.mkInstance.queue.prepend(item);
  // }
  //
  // playLater(item: SongModel): void {
  //   this.mkInstance.queue.append(item);
  // }
  //
  // get currentPlaybackDuration(): number {
  //   return this.mkInstance.currentPlaybackDuration;
  // }
  //
  // get currentPlaybackTime(): number {
  //   return this.mkInstance.currentPlaybackTime;
  // }
  //
  //
  // removeFromQueue(index: number): void {
  //   this.mkInstance.queue.remove(index + this.queuePosition);
  // }
  //
  //
  //
  // changeVolume(volume: number): void {
  //   this.mkInstance.volume = volume;
  // }
  //
  // changeBitrate() {
  //   this.musickitConfig.musicKit.bitrate = this.bitrate;
  //   localStorage.setItem('bitrate', this.bitrate.toString());
  // }
  //
  //

  private async scheduleNotification() {
    const nowPlaying = this.nowPlaying();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: nowPlaying.attributes.name,
          body: `${nowPlaying.attributes.artistName} - ${nowPlaying.attributes.albumName} `,
          id: 1,
          schedule: { at: new Date() },
          smallIcon: nowPlaying.attributes.artwork.url,
        },
      ],
    });
  }
}
