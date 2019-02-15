import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'album-preview-item',
  templateUrl: './album-preview-items.component.html',
  styleUrls: ['./album-preview-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush


})
export class AlbumPreviewItemsComponent {
  @Input() album: any;
  @Input() index: number;
  constructor() {}
}
