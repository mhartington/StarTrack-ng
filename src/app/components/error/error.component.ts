import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'error-emoji',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
