import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
@Component({
  selector: 'preview-header',
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewHeaderComponent {

  @Output() play: EventEmitter<{ shuffle: boolean }> = new EventEmitter();
  public duration = 0;
  private _collection: any = null;
  bgColor: string;

  @HostBinding('style.background-image') bg: SafeStyle = '';

  @Input()
  get collection() {
    return this._collection;
  }
  set collection(val: any) {
    this._collection = val;
    if (this._collection) {
      for (const song of this._collection.relationships.tracks.data) {
        if (song.attributes.durationInMillis) {
          this.duration += song.attributes.durationInMillis;
        }
      }

      this.bg = this.sanitizer.bypassSecurityTrustStyle(
        `url("${(window as any).MusicKit.formatArtworkURL(
          { url: this._collection.attributes.artwork.url },
          1000,
          1000
        )}")`

      );
      this.bgColor = this._collection.attributes.artwork.bgColor
    this.cd.markForCheck();
    }
  }

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {}

  formatDuraction(val: number) {
    const { hours, minutes } = (window as any).MusicKit.formattedMilliseconds(val);
    const hourTime = hours === 0 ? `` : `${hours} hours, `;
    const minutesTime = `${minutes} minutes`;
    return `${hourTime} ${minutesTime} `;
  }
  playCollection(shuffle = false) {
    this.play.emit({ shuffle });
  }
}

