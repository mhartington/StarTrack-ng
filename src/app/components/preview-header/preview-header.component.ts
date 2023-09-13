import { JsonPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IonNote,
  IonText,
  IonModal,
  IonButton,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonContent,
  IonSkeletonText,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { LazyImgComponent } from '../lazy-img/lazy-img.component';
import { play, shuffle } from 'ionicons/icons';

@Component({
  selector: 'preview-header',
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    FormatArtworkUrlPipe,
    LazyImgComponent,
    JsonPipe,
    IonText,
    IonNote,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonContent,
    IonSkeletonText,
    IonIcon,
    IonRouterOutlet,
  ],
})
export class PreviewHeaderComponent {
  @Output() playCollection: EventEmitter<{ shuffle: boolean }> =
    new EventEmitter();
  @Input() collection: any = null;
  @ViewChild(IonModal) modal: IonModal;

  routerOutlet = inject(IonRouterOutlet).nativeEl;
  constructor() {
    addIcons({ play, shuffle });
  }
  togglePlay(shuffle = false): void {
    this.playCollection.emit({ shuffle });
  }
  async dismiss() {
    await this.modal.dismiss();
  }
}
