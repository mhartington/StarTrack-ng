import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
import { ColorThiefService } from '../../providers/color-thief/color-thief.service';

@Directive({
  selector: '[colorFromImage]'
})
export class ColorFromImageDirective implements AfterViewInit {
  @Input() colorFromImage;
  constructor(public colorThief: ColorThiefService, public el: ElementRef) {}
  ngAfterViewInit() {
    this.colorThief
      .getColorFromUrl(this.colorFromImage.src)
      .then((res: { dominantColor: number[]; imageUrl: string }) => {
        const colorMap = res.dominantColor;
        this.el.nativeElement.style.backgroundColor = `rgb(${colorMap[0]},${
          colorMap[1]
        },${colorMap[2]})`;
      });
  }
}
