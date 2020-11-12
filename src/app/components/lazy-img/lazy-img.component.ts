import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lazy-img',
  templateUrl: './lazy-img.component.html',
  styleUrls: ['./lazy-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImgComponent {
  @Input() src = '';
  @Input() alt = '';
}
