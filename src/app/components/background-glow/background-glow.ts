import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'background-glow',
  templateUrl: './background-glow.html',
  styleUrls: ['./background-glow.scss'],
})
export class BackgroundGlow {
  @Input() src: string;

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  private readonly speed = 0.01;
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
      this.ctx.drawImage( this.source, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.globalAlpha = this.opacity;
      this.ctx.drawImage( this.dest, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.opacity += this.speed;
      requestAnimationFrame(this.renderImage.bind(this));
    } else {
      this.source = this.dest;
    }
  }
}
