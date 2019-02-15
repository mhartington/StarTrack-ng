import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongItemComponent {
  @Input() song: any;
  @Input() index = null;
  constructor() {}
}
