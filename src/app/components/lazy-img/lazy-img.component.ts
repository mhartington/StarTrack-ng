import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild
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

  @ViewChild('lazyImage', { static: true }) lazyImage: ElementRef<HTMLImageElement>;

  constructor(private cd: ChangeDetectorRef) {}

  async ngAfterViewInit() {
    const options: IntersectionObserverInit = {
      root: this.lazyImage.nativeElement.closest('ion-content')
    };

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(await this.onObserve.bind(this), options);
      this.observer.observe(this.lazyImage.nativeElement);
    } else {
      setTimeout(() => this.preload(this.lazyImage.nativeElement), 200);
    }
  }

  async onObserve(data: IntersectionObserverEntry[]): Promise<IntersectionObserverCallback> {
    if (data[0].isIntersecting) {
      await this.preload(data[0].target as HTMLImageElement);
      this.observer.disconnect();
      return;
    }
  }

  applyImage(target: HTMLImageElement, src: string) {
    return new Promise(resolve => {
      target.src = src;
      resolve();
    });
  }

  fetchImage(url: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  async preload(targetEl: HTMLImageElement) {
    await this.fetchImage(this.src);
    await this.applyImage(targetEl, this.src);
    this.isLoaded = true;
    this.cd.markForCheck();
  }
}
