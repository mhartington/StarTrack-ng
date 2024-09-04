import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  input,
} from '@angular/core';
import { IonText, IonThumbnail } from '@ionic/angular/standalone';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
import { SongItemComponent } from '../song-item/song-item.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { Song } from '../../../@types/song';

@Component({
  selector: 'queue-list',
  templateUrl: './queue-list.html',
  styleUrls: ['./queue-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SongItemComponent,
    FormatArtworkUrlPipe,
    NgForOf,
    NgIf,
    LazyImgComponent,
    IonText,
    IonThumbnail,
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
          query('song-item:leave ~ song-item:not(:leave)', [
            animate(
              '300ms ease-out',
              style({ transform: `translate3d(0, calc(-100% + 1px), 0)` })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class QueueListComponent {
  queue = input<Song[]>();
  @Output() playAt = new EventEmitter();
}
