import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  @Input() lazyParent = '';

  @ViewChild('lazyImage', { static: true })
  lazyImage: ElementRef<HTMLImageElement>;
  isLoaded = false;

  constructor() {}
  async ngAfterViewInit(): Promise<void> {
    if ('loading' in HTMLImageElement.prototype) {
      this.lazyImage.nativeElement.src = this.src;
      this.lazyImage.nativeElement.alt = this.alt;
    } else if ('IntersectionObserver' in window) {
      const options: IntersectionObserverInit = { root: this.lazyImage.nativeElement.closest(this.lazyParent) };
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

  markForChange() {
    this.isLoaded = true;
    markDirty(this);
  }

  async preload(targetEl: HTMLImageElement): Promise<void> {
    // prefect the image and prime it
    await this.fetchImage(this.src);
    // ok, actually apply the image to the real img tag
    await this.applyImage(targetEl, this.src);
  }
}
