import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';

@Component({
  selector: 'album-preview-item',
  templateUrl: './album-preview-items.component.html',
  styleUrls: ['./album-preview-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormatArtworkUrlPipe,
    LazyImgComponent
  ]
})
export class AlbumPreviewItemsComponent {
  @Input() album: any;
  @Input() index: number;
  constructor() {}
}
