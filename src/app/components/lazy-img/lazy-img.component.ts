import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  HostBinding,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'lazy-img',
  templateUrl: './lazy-img.component.html',
  styleUrls: ['./lazy-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyImgComponent implements AfterViewInit {
  observer: IntersectionObserver;
  @Input() src = '';
  @Input() alt = '';

  @HostBinding('class.loaded') isLoaded = false;

  @ViewChild('lazyImage') lazyImage: ElementRef<HTMLImageElement>;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const options: IntersectionObserverInit = {
      root: this.lazyImage.nativeElement.closest('ion-content')
    };

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.onObserve.bind(this),
        options
      );
      this.observer.observe(this.lazyImage.nativeElement);
    } else {
      setTimeout(() => this.preload(this.lazyImage.nativeElement), 200);
    }
  }

  onObserve(data): IntersectionObserverCallback {
    if (data[0].isIntersecting) {
      this.preload(data[0].target).then(() => this.observer.disconnect());
    }
    return;
  }

  applyImage(target: HTMLImageElement, src) {
    return new Promise(resolve => {
      target.src = src;
      resolve();
    });
  }

  fetchImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  preload(targetEl) {
    return this.fetchImage(this.src)
      .then(() => this.applyImage(targetEl, this.src))
      .then(() => (this.isLoaded = true))
      .then(() => this.cd.markForCheck());
  }
}

