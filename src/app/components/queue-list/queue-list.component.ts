import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonText, IonThumbnail } from '@ionic/angular/standalone';
import { FormatArtworkUrlPipe } from 'src/app/pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
import { SongItemComponent } from '../song-item/song-item.component';

@Component({
  selector: 'queue-list',
  templateUrl: `./queue-list.html`,
  styleUrls: ['./queue-list.scss'],
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
export class QueueListComponent {
  @Input() queue: any[];
  @Output() playAt = new EventEmitter();
}
