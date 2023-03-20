import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
@Component({
  selector: 'preview-header',
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, FormatArtworkUrlPipe, LazyImgComponent],
})
export class PreviewHeaderComponent {
  @Output() playCollection: EventEmitter<{ shuffle: boolean }> = new EventEmitter();
  @Input() collection: any = null
  togglePlay(shuffle = false): void {
    this.playCollection.emit({ shuffle });
  }
}
