import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { LetModule, PushModule } from '@rx-angular/template';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Song } from 'src/@types/song';
import {
  MsToMinsPipe,
  SecondsToMins,
} from 'src/app/pipes/ms-to-mins/ms-to-mins.pipe';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import {
  PlaybackStates,
  PlayerService,
  RepeatMode,
} from '../../providers/player/player.service2';
import { BackgroundGlow } from '../background-glow/background-glow';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
import { NowPlayingArtworkComponent } from '../now-playing-artwork/now-playing-artwork.component';
import { SongItemComponent } from '../song-item/song-item.component';
import { SvgBarsComponent } from '../svg-bars/svg-bars.component';
import { createQueueAnimation } from './player-modal.animation';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    LetModule,
    PushModule,
    SongItemComponent,
    FormsModule,
    SvgBarsComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    NowPlayingArtworkComponent,
    BackgroundGlow,
    MsToMinsPipe,
    SecondsToMins,
  ],
  animations: [
    trigger('listAnimation', [
      transition(':increment', [
        group([
          query('song-item', [
            style({ transform: 'translate3d(0, calc(-100% + 1px), 0)' }),
            animate(
              '300ms ease-out',
              style({ transform: 'translate3d(0, 0, 0)' })
            ),
          ]),
        ]),
      ]),
      transition(':decrement', [
        group([
          query(':leave', [animate('250ms ease-out', style({ opacity: 0 }))]),
          query('song-item:not(:leave)', [
            animate(
              '300ms ease-out',
              style({
                transform: 'translate3d(0, calc(-100% + 1px), 0)',
              })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class PlayerModalComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper') wrapper: ElementRef<HTMLElement>;

  private modalCtrl = inject(ModalController);
  public player = inject(PlayerService);

  public backgroundColor = {};
  public playbackStates = PlaybackStates;
  public repeatMode = RepeatMode;
  public state$ = this.player.select();
  public queue$ = this.player.select('upNext');

  public playbackTime = 0;
  public showQueue = false;

  private playbackTime$ = this.player.select('playbackTime');
  private isScrubbing = false;
  private playbackTimeSub: Subscription;
  constructor() {
    this.playbackTimeSub = this.playbackTime$
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
  ngOnDestroy() {
    this.playbackTimeSub.unsubscribe();
  }
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
  playAtIndex(e: any, song: Song) {
    this.stopProp(e);
    const parent: HTMLElement = e.target.closest('.queue-scroller');
    parent.scrollTo({ top: 0, behavior: 'smooth' });
    this.player.skipTo(song);
  }
  stopProp(e: any): void {
    e.stopPropagation();
  }
  async next(e: any): Promise<void> {
    this.stopProp(e);
    await this.player.skipToNextItem();
  }
  async prev(e: any): Promise<void> {
    this.stopProp(e);
    await this.player.skipToPreviousItem();
  }
  async toggleQueue() {
    this.showQueue = !this.showQueue;
    await createQueueAnimation(this.wrapper.nativeElement, this.showQueue);
  }
  toggleShuffle(shuffleMode: boolean) {
    this.player.toggleShuffle(!shuffleMode);
  }
  toggleRepeatMode() {
    this.player.toggleRepeat();
  }

}
