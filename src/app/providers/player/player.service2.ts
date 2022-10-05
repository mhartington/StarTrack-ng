import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RxState } from '@rx-angular/state';
import { fromEvent } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Song } from 'src/@types/song';
export type QueueOpts = {
  url: string;
  shuffle: boolean | false;
  startPosition?: number;
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

// TODO: Transition over to using MK internal state
interface IPlayerState {
  bitrate: number;
  playbackState: PlaybackStates;
  queue: any[];
  queuePosition: number;
  upNext: any[];
  repeatMode: RepeatMode;
  isShuffling: boolean;
  infiniteLoadTimeout: any;
  playbackDuration: number;
  playbackTime: number;
  playbackTimeRemaining: number;
  nowPlayingItem: Partial<Song | any>;
}

@Injectable({ providedIn: 'root' })
export class PlayerService extends RxState<IPlayerState>{
  private mkInstance = (window as any).MusicKit?.getInstance();
  private mkEvents = (window as any).MusicKit?.Events;

  private playbackTimeDidChange$ = fromEvent(
    this.mkInstance,
    this.mkEvents.playbackTimeDidChange
  ).pipe(
    map(({ currentPlaybackTime, currentPlaybackTimeRemaining }: any) => ({
      playbackTime: currentPlaybackTime,
      playbackTimeRemaining: currentPlaybackTimeRemaining,
    }))
  );

  private playbackDurationDidChange$ = fromEvent(
    this.mkInstance,
    this.mkEvents.playbackDurationDidChange
  ).pipe(map((event: any) => ({ playbackDuration: event.duration })));

  private mediaItemsStateDidChange$ = fromEvent( this.mkInstance, this.mkEvents.mediaItemStateDidChange)
  .pipe(map((event: any) => ({ nowPlayingItem: event, playbackTime: 0 })));

  private playbackStateDidChange$ = fromEvent( this.mkInstance, this.mkEvents.playbackStateDidChange)
  .pipe(map((event: any) => ({ playbackState: PlaybackStates[PlaybackStates[event.state]], })));

  private queueItemsDidChange$ = fromEvent( this.mkInstance, this.mkEvents.queueItemsDidChange)
  .pipe( map(() => ({ queue: this.mkInstance.queue.items, upNext: this.mkInstance.queue.unplayedUserItems.slice(1), })));

  private queuePositionDidChange$ = fromEvent(this.mkInstance, this.mkEvents.queuePositionDidChange)
  .pipe( map((e: any) => ({ queuePosition: e.position + 1, upNext: this.mkInstance.queue.unplayedUserItems.slice(1), })));

  // Doesnt modify state
  private playbackState$ = this.select('playbackState').pipe(
    withLatestFrom(this.$),
    tap(([playbackState, currentState]) => {
      if (
        playbackState === PlaybackStates.PAUSED ||
        playbackState === PlaybackStates.STOPPED
      ) {
        this.title.setTitle('Star Track');
      } else {
        this.title.setTitle(
          `${currentState.nowPlayingItem.attributes.name} • ${currentState.nowPlayingItem.attributes.artistName}`
        );
      }
    })
  );
  private mediaPlaybackError$ = fromEvent(
    this.mkInstance,
    this.mkEvents.mediaPlaybackError
  ).pipe(
    tap(() => console.log('mediaPlayBackError')),
    map(() => ({ nowPlaying: null, queue: null }))
  );

  constructor(private title: Title) {
    super();
    this.set({
      bitrate: 256,
      playbackState: PlaybackStates.NONE,
      queue: [],
      upNext: [],
      queuePosition: 0,
      repeatMode: 0,
      isShuffling: false,
      infiniteLoadTimeout: null,
      playbackDuration: 0,
      playbackTime: 0,
      nowPlayingItem: {
        attributes: { artwork: { url: 'assets/imgs/default.svg' } },
      },
    });

    this.connect(this.mediaPlaybackError$);
    this.connect(this.playbackTimeDidChange$);
    this.connect(this.playbackDurationDidChange$);
    this.connect(this.playbackStateDidChange$);
    this.connect(this.mediaItemsStateDidChange$);
    this.connect(this.queueItemsDidChange$);
    this.connect(this.queuePositionDidChange$);

    // Doesn't change state, just reads from it
    this.hold(this.playbackState$);
  }

  // PLAYER METHODS
  // Play Album
  async playAlbum(type: string, album: string, startPosition: number, shuffle = false) {
    this.toggleShuffle(shuffle);
    console.log([type])
    await this.mkInstance.setQueue({ album });
    await this.play();
  }
  async playPlaylist(playlist: string, startPosition: number, shuffle = false) {
    await this.mkInstance.setQueue({ playlist, startPosition });
    this.toggleShuffle(shuffle);
    await this.play();
  }
  async setQueueFromItems(items: any[], startPosition = 0, shuffle = false) {
    if (shuffle) { items = items.sort(() => 0.5 - Math.random()); }
    const newItems = items.map((item) => new (window as any).MusicKit.MediaItem(item))
    await this.mkInstance.setQueue({ items: newItems });
    await this.mkInstance.changeToMediaAtIndex(startPosition);
  }

  // Eventually try to move this all together
  async playCollection(opts: any) {
    let queueOpts: QueueOpts = {
      shuffle: opts.shuffle ?? false,
      url: opts.url,
    };
    if (opts.startPosition) {
      queueOpts.startPosition = opts.startPosition;
    }
    await this.mkInstance.setQueue(queueOpts);
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
    this.set((state: Partial<IPlayerState>) => ({
      ...state,
      repeatMode: this.mkInstance.repeatMode,
    }));
  }
  toggleShuffle(shouldShuffle: boolean): void {
    this.mkInstance.shuffle = shouldShuffle;
    this.set((state) => ({
      ...state,
      isShuffling: !!this.mkInstance.shuffleMode,
    }));
  }
  async skipToNextItem() {
    await this.stop();
    const state = this.get();
    if (state.repeatMode === 1) {
      return await this.seekToTime(0);
    }
    return await this.mkInstance.skipToNextItem();
  }
  async skipToPreviousItem() {
    await this.stop();
    const state = this.get();
    if (state.repeatMode === 1) {
      return await this.seekToTime(0);
    }
    return await this.mkInstance.skipToPreviousItem();
  }
  async seekToTime(time: number) {
    await this.mkInstance.seekToTime(time);
  }
  async skipTo(song: Song) {
    const index = this.get('queue').indexOf(song);
    await this.stop();
    await this.mkInstance.changeToMediaAtIndex(index);
  }
  //
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
}
