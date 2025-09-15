import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';

@Component({
  selector: 'now-playing-artwork',
  templateUrl: './now-playing-artwork.component.html',
  styleUrls: ['./now-playing-artwork.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LazyImgComponent],
})
export class NowPlayingArtworkComponent {
  @Input() src: string;
  @Input() alt: string;
}
