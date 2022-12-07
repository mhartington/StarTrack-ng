import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
  inject
} from '@angular/core';
@Component({
  selector: 'lazy-img',
  templateUrl: './lazy-img.component.html',
  styleUrls: ['./lazy-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,

})
export class LazyImgComponent {
  @Input() src = '';
  @Input() alt = '';

  public isLoaded = false;
  private cdf = inject(ChangeDetectorRef)
  
  markForChange() {
    this.isLoaded = true;
    this.cdf.markForCheck();
  }
}
