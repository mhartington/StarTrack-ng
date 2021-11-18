import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'now-playing-artwork',
  templateUrl: './now-playing-artwork.component.html',
  styleUrls: ['./now-playing-artwork.component.scss'],
})
export class NowPlayingArtworkComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;

  constructor() { }

  ngOnInit() {}

}
