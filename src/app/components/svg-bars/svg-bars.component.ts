import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'svg-bars',
  templateUrl: './svg-bars.component.html',
  styleUrls: ['./svg-bars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SvgBarsComponent {}
