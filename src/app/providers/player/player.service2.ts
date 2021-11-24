import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RxState } from '@rx-angular/state';
import { tap } from 'rxjs/operators';
import { Song } from 'src/@types/song';
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

// export type PlayerState = {
//   items: Array<Partial<Song>>;
//   length: number;
// };

// TODO: Transition over to using MK internal state
interface IPlayerState {
  bitrate: number;
  playbackState: PlaybackStates;
  queue: any[];
  queuePosition: number;
  upNext: any[];
  repeatMode: number;
  isShuffling: boolean;
  infiniteLoadTimeout: any;
  playbackDuration: number;
  playbackTime: number;
  nowPlayingItem: Partial<Song | any>;
}

@Injectable({ providedIn: 'root' })
export class PlayerService extends RxState<IPlayerState> {
  private mkInstance = (window as any).MusicKit.getInstance();
  private mkEvents = (window as any).MusicKit.Events;

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

    this.mkInstance.addEventListener(
      this.mkEvents.playbackTimeDidChange,
      this.playbackTimeDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.mkEvents.playbackDurationDidChange,
      this.playbackDurationDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.mkEvents.mediaPlaybackError,
      this.mediaPlaybackError.bind(this)
    );
    this.mkInstance.addEventListener(
      this.mkEvents.playbackStateDidChange,
      this.playbackStateDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.mkEvents.mediaItemStateDidChange,
      this.mediaItemStateDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.mkEvents.queueItemsDidChange,
      this.queueItemsDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.mkEvents.queuePositionDidChange,
      this.queuePositionDidChange.bind(this)
    );
  }

  // GLOBAL LISTENERS
  playbackTimeDidChange(event: any) {
    this.set((state) => ({
      ...state,
      playbackTime: event.currentPlaybackTime,
    }));
  }
  playbackDurationDidChange(event: any) {
    this.set((state) => ({ ...state, playbackDuration: event.duration }));
  }
  mediaItemStateDidChange(event: any) {
    // console.log('item did chage', this.mkInstance.queue.unplayedUserItems)
    this.set((state) => {
      const newState = {
        ...state,
        nowPlayingItem: event,
        playbackTime: 0,
      };
      return newState;
    });
    this.select('nowPlayingItem').pipe(
      tap((nowPlaying) =>
        this.title.setTitle(
          `${nowPlaying.attributes.name} • ${nowPlaying.attributes.artistName}`
        )
      )
    );
  }
  playbackStateDidChange(event: any) {
    this.set((state) => ({
      ...state,
      playbackState: PlaybackStates[PlaybackStates[event.state]],
    }));
    const currentState = this.get();
    if (currentState.playbackState === PlaybackStates.WAITING) {
      const lastItem = currentState.nowPlayingItem;
      currentState.infiniteLoadTimeout = setTimeout(async () => {
        if (
          currentState.playbackState === PlaybackStates.WAITING &&
          lastItem === currentState.nowPlayingItem
        ) {
          await this.stop();
          await this.play();
        }
      }, 2000);
    } else {
      clearTimeout(currentState.infiniteLoadTimeout);
    }
    if (
      currentState.playbackState === PlaybackStates.PAUSED ||
      currentState.playbackState === PlaybackStates.STOPPED
    ) {
      this.title.setTitle('Star Track');
    } else {
      this.title.setTitle(
        `${currentState.nowPlayingItem.attributes.name} • ${currentState.nowPlayingItem.attributes.artistName}`
      );
    }
  }
  mediaPlaybackError(event: any): void {
    console.log('mediaPlayBackError', event);
  }
  queueItemsDidChange(event: any): void {
    // console.log('unplayed items', this.mkInstance.queue);
    // const upNext = this.mkInstance.queue.unplayedUserItems.filter((e, i) => i !== 0 );
    // console.log("upNext", upNext)
    this.set((state: any) => ({ ...state, queue: this.mkInstance.queue.items }));
  }
  queuePositionDidChange(event: any): void {
    // console.log('unplayed items', this.mkInstance.queue.unplayedUserItems);
    const upNext = this.mkInstance.queue.unplayedUserItems.filter((e, i) => i !== 0 );
    // console.log("upNext", upNext)
    this.set((state) => ({ ...state, queuePosition: event.position + 1, upNext }));
  }

  // PLAYER METHODS
  //
  // Play Album
  async playAlbum(album: string, startPosition: number, shuffle = false) {
    await this.mkInstance.setQueue({ album, startPosition });
    this.toggleShuffle(shuffle);
    await this.play();
  }
  async playPlaylist(playlist: string, startPosition: number, shuffle = false) {
    await this.mkInstance.setQueue({ playlist, startPosition });
    this.toggleShuffle(shuffle);
    await this.play();
  }


  async setQueueFromItems(items: any[], startPosition = 0, shuffle = false) {
    if (shuffle) {
      items = items.sort(() => 0.5 - Math.random());
    }
    const newItems = items.map((item) => ({
      ...item,
      container: { id: item.id },
    }));
    await this.mkInstance.setQueue({ items: newItems });
    await this.mkInstance.changeToMediaAtIndex(startPosition);
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
    const nextRepeatMode = (this.mkInstance.repeatMode + 1) % 3;
    this.mkInstance.repeatMode = nextRepeatMode;
    this.set((state: Partial<IPlayerState>) => ({
      ...state,
      repeatMode: this.mkInstance.repeatMode,
    }));
  }
  toggleShuffle(shouldShuffle: boolean): void {
    this.mkInstance.shuffleMode = !!shouldShuffle;
    this.set((state) => ({
      ...state,
      isShuffling: this.mkInstance.shuffleMode,
    }));
  }
  async skipToNextItem() {
    const state = this.get();
    if (state.repeatMode === 1) {
      return this.seekToTime(0);
    }
    await this.mkInstance.skipToNextItem();
  }
  async skipToPreviousItem() {
    const state = this.get();
    if (state.repeatMode === 1) {
      return this.seekToTime(0);
    }
    await this.mkInstance.skipToPreviousItem();
  }
  async seekToTime(time: number) {
    await this.mkInstance.seekToTime(time);
  }
  async skipTo(index: number) {
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
