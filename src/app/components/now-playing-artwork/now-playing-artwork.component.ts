import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';

@Component({
  selector: 'now-playing-artwork',
  templateUrl: './now-playing-artwork.component.html',
  styleUrls: ['./now-playing-artwork.component.scss'],
  standalone: true,
  imports: [CommonModule, LazyImgComponent, FormatArtworkUrlPipe]
})
export class NowPlayingArtworkComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;

  constructor() { }

  ngOnInit() {}

}
