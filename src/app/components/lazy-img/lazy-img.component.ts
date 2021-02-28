import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
  ɵmarkDirty as markDirty,
} from '@angular/core';

@Component({
  selector: 'lazy-img',
  templateUrl: './lazy-img.component.html',
  styleUrls: ['./lazy-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImgComponent implements AfterViewInit {
  private observer: IntersectionObserver;
  @Input() src = '';
  @Input() alt = '';

  @ViewChild('lazyImage', { static: true }) lazyImage: ElementRef<
    HTMLImageElement
  >;

  constructor() {}
  async ngAfterViewInit(): Promise<void> {
    if ('loading' in HTMLImageElement.prototype) {
      this.lazyImage.nativeElement.src = this.src;
      this.lazyImage.nativeElement.alt = this.alt;
      markDirty(this)

    } else if ('IntersectionObserver' in window) {
      const options: IntersectionObserverInit = {
        root: this.lazyImage.nativeElement.closest('ion-content'),
      };
      this.observer = new IntersectionObserver(
        await this.onObserve.bind(this),
        options
      );
      this.observer.observe(this.lazyImage.nativeElement);
    } else {
      setTimeout(() => this.preload(this.lazyImage.nativeElement), 200);
    }
  }

  async onObserve(
    data: IntersectionObserverEntry[]
  ): Promise<IntersectionObserverCallback> {
    if (data[0].isIntersecting) {
      await this.preload(data[0].target as HTMLImageElement);
      this.observer.disconnect();
      return;
    }
  }

  applyImage(target: HTMLImageElement, src: string): Promise<void> {
    return new Promise((resolve) => {
      target.src = src;
      target.crossOrigin = 'anonymous';
      target.alt = this.alt;
      resolve();
    });
  }

  fetchImage(url: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.crossOrigin = 'anonymous';
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  async preload(targetEl: HTMLImageElement): Promise<void> {
    // prefect the image and prime it
    await this.fetchImage(this.src);
    // ok, actually apply the image to the real img tag
    await this.applyImage(targetEl, this.src);
  }
}
