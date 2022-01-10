import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ɵmarkDirty as markDirty,
} from '@angular/core';

@Component({
  selector: 'lazy-img',
  templateUrl: './lazy-img.component.html',
  styleUrls: ['./lazy-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImgComponent {
  @Input() src = '';
  @Input() alt = '';

  public isLoaded = false;

  constructor() {}
  markForChange() {
    this.isLoaded = true;
    markDirty(this);
  }
}
