import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RxState } from '@rx-angular/state';
import { tap } from 'rxjs/operators';
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
interface INowPlaying {
  albumName: string;
  artistName: string;
  artworkURL: string;
  title: string;
  trackNumber: number;
  id: string;
  type: string;
  container: {
    id: string;
  };
  collectionId: string;
  assets: {
    metadata: {
      artistId: string;
      playlistId: string;
    };
  }[];
}
interface IPlayerState {
  bitrate: number;
  playbackState: PlaybackStates;
  queue: any[];
  queuePosition: number;
  repeatMode: number;
  isShuffling: boolean;
  infiniteLoadTimeout: any;
  playbackDuration: number;
  playbackTime: number;
  nowPlayingItem: INowPlaying;
}

@Injectable({ providedIn: 'root' })
export class PlayerService extends RxState<IPlayerState> {
  private mkInstance = (window as any).MusicKit.getInstance();
  private musicKitEvents = (window as any).MusicKit.Events;

  constructor(private title: Title) {
    super();
    this.set({
      bitrate: 256,
      playbackState: PlaybackStates.NONE,
      queue: [],
      queuePosition: 0,
      repeatMode: 0,
      isShuffling: false,
      infiniteLoadTimeout: null,
      playbackDuration: 0,
      playbackTime: 0,
      nowPlayingItem: {
        albumName: '',
        artistName: '',
        artworkURL: 'assets/imgs/default.jpeg',
        title: '',
        trackNumber: 1,
        id: '',
        type: '',
        container: { id: '' },
        collectionId: '',
        assets: [
          {
            metadata: {
              artistId: '',
              playlistId: '',
            },
          },
        ],
      },
    });

    this.mkInstance.addEventListener(
      this.musicKitEvents.playbackTimeDidChange,
      this.playbackTimeDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.musicKitEvents.playbackDurationDidChange,
      this.playbackDurationDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.musicKitEvents.mediaPlaybackError,
      this.mediaPlaybackError.bind(this)
    );
    this.mkInstance.addEventListener(
      this.musicKitEvents.playbackStateDidChange,
      this.playbackStateDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.musicKitEvents.mediaItemStateDidChange,
      this.mediaItemStateDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.musicKitEvents.queueItemsDidChange,
      this.queueItemsDidChange.bind(this)
    );
    this.mkInstance.addEventListener(
      this.musicKitEvents.queuePositionDidChange,
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
    console.log('mediaItemStateDidChange', event)
    this.set((state) => ({
      ...state,
      nowPlayingItem: event,
      playbackTime: 0,
    }));
    this.select('nowPlayingItem').pipe(
      tap((nowPlaying) =>
        this.title.setTitle(`${nowPlaying.title} • ${nowPlaying.artistName}`)
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
        `${currentState.nowPlayingItem.title} • ${currentState.nowPlayingItem.artistName}`
      );
    }
  }
  mediaPlaybackError(event: any): void {
    console.log('mediaPlayBackError', event);
  }
  queueItemsDidChange(event: any): void {
    console.log('queueItemsDidChange', event)
    this.set((state: any) => ({ ...state, queue: event, }));
  }
  queuePositionDidChange(event: any): void {
    console.log('queuePositionDidChange', event)
    this.set((state) => ({ ...state, queuePosition: event.position + 1, }));
  }


  // PLAYER METHODS
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
