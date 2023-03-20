import { Component, Input } from '@angular/core';
import { BackgroundCell } from './background-cell';

@Component({
  standalone: true,
  selector: 'background-glow',
  template: `
    <background-cell class="cell-1" [src]="src" />
    <background-cell class="cell-2" [src]="src" />
    <background-cell class="cell-3" [src]="src" />
  `,
  styleUrls: ['./background-glow.scss'],
  imports: [BackgroundCell],
})
export class BackgroundGlow {
  @Input() src: string;
}
