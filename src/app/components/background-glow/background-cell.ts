import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'background-cell',
  template: `<canvas #canvas></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        transform: translate3d(0, 0, 0);
        transform-origin: center center;
        height: 100%;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-content: center;
        filter: blur(180px) brightness(70%) saturate(1.7);
      }
      canvas {
        height: 100%;
        width: 100%;
      }

      :host(.cell-1) {
        width: 100%;
      }

      :host(.cell-1) canvas {
      }

      :host(.cell-2) {
        transform: rotate(180deg) translate3d(10%, -10%, 0);
        transform-origin: 50% 50%;
        width: 100%;
        height: 100%;
      }

      :host(.cell-3) {
        height: 50%;
        top: 0;
        left: 10%;
      }

      :host(.cell-3) canvas {
        transform: rotate(240deg);
        aspect-ratio: 1/1;
        width: unset;
        height: 126%;
      }
    `,
  ],
})
// filter: blur(180px) brightness(70%) saturate(1.7);
export class BackgroundCell {
  @Input() src: string;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  private readonly speed = 0.02;
  private opacity = 0;
  private source: HTMLImageElement;
  private dest: HTMLImageElement;

  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges({ src }: SimpleChanges) {
    this.opacity = 0;
    const img = new Image();
    img.onload = this.renderImage.bind(this);
    img.src = src.currentValue;
    this.dest = img;

    if (src.firstChange) {
      this.dest = img;
      this.source = img;
    } else {
      this.dest = img;
    }
  }

  renderImage() {
    if (this.opacity < 1) {
      this.ctx.globalAlpha = 1;
      this.ctx.drawImage(
        this.source,
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      );
      this.ctx.globalAlpha = this.opacity;
      this.ctx.drawImage(
        this.dest,
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      );
      this.opacity += this.speed;
      requestAnimationFrame(this.renderImage.bind(this));
    } else {
      this.source = this.dest;
    }
  }
}
