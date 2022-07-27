import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input,SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'background-glow',
  templateUrl: './background-glow.html',
  styleUrls: ['./background-glow.scss'],
  animations: [
    trigger('imageFade', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate(200)),
    ]),
  ],
})
export class BackgroundGlow {
  @Input() src: string;
  public odd: string | null = '';
  public even: string | null = '';

  public showOdd = false;
  public showEven = false;

  constructor() {}
  ngOnChanges({ src }: SimpleChanges) {
    if (src.firstChange) {
      this.nextImg(src.currentValue);
    } else {
      const incomingVal = new URL(src.currentValue);
      const previousVal = new URL(src.previousValue);
      if (previousVal.pathname !== incomingVal.pathname) {
        this.nextImg(src.currentValue);
      }
    }
  }

  public nextImg(nextImg: string) {
    if (!!this.showOdd) {
      this.even = nextImg;
    } else {
      this.odd = nextImg;
    }
  }

  onOddLoad() {
    this.showOdd = true;
    this.showEven = false;
  }
  onEvenLoad() {
    this.showEven = true;
    this.showOdd = false;
  }

  onOddAnimationDone(e: any) {
    if (e.toState === false && e.fromState === true) {
      requestAnimationFrame(() => { this.odd = null})
    }
  }
  onEvenAnimationDone(e: any) {
    if (e.toState === false && e.fromState === true) {
      requestAnimationFrame(() => { this.even = null})
    }
  }
}
