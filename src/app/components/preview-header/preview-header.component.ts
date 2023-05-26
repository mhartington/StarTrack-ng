import { JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IonicModule, IonModal, IonRouterOutlet } from '@ionic/angular';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';

@Component({
  selector: 'preview-header',
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, IonicModule, FormatArtworkUrlPipe, LazyImgComponent, JsonPipe],
})
export class PreviewHeaderComponent {
  @Output() playCollection: EventEmitter<{ shuffle: boolean }> = new EventEmitter();
  @Input() collection: any = null
  @ViewChild(IonModal) modal: IonModal;

  routerOutlet = inject(IonRouterOutlet).nativeEl;

  togglePlay(shuffle = false): void {
    this.playCollection.emit({ shuffle });
  }
  async dismiss(){
    await this.modal.dismiss();
  }
}
