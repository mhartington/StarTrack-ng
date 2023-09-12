import { NgIf } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  IonCard,
  IonLabel,
  IonNote,
  IonSkeletonText,
} from '@ionic/angular/standalone';

@Component({
  selector: '[album-preview-item]',
  templateUrl: './album-preview-items.component.html',
  styleUrls: ['./album-preview-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, IonCard, IonLabel, IonNote, IonSkeletonText],
})
export class AlbumPreviewItemsComponent {
  @Input() album: any;
  @Input() index: number;
  constructor() {}
}
