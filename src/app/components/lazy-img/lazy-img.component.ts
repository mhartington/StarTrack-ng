import {
  ChangeDetectionStrategy,
  Component,
  signal,
  input,
} from '@angular/core';
@Component({
  selector: 'lazy-img',
  templateUrl: './lazy-img.component.html',
  styleUrls: ['./lazy-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LazyImgComponent {
  public src = input('');
  public alt = input('');
  public isLoaded = signal(false);
}
