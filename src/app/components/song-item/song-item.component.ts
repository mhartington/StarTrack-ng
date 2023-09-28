import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonSkeletonText,
  IonText,
  PopoverController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisHorizontal } from 'ionicons/icons';
import { Song } from 'src/@types/song';
import { MsToMinsPipe } from '../../pipes/ms-to-mins/ms-to-mins.pipe';
import { SongContextMenuComponent } from '../song-contenxt-menu/song-context-menu.component';

@Component({
  selector: 'song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MsToMinsPipe,
    IonButton,
    IonButtons,
    IonLabel,
    IonSkeletonText,
    IonIcon,
    IonNote,
    IonText,
    IonItem
  ],
})
export class SongItemComponent {
  @Input() song: Song;
  @Input() index = null;
  @Input() color: string;
  @Input() disabled: boolean;

  @Output() onClick = new EventEmitter<any>;
  private popoverCtrl = inject(PopoverController);
  handleClick(){
    this.onClick.emit();
  }
  constructor() {
    addIcons({
      ellipsisHorizontal,
    });
  }
  async showMore(e: any) {
    console.log('click')
    e.stopPropagation();
    const popover = await this.popoverCtrl.create({
      component: SongContextMenuComponent,
      componentProps: { song: this.song },
      event: e,
    });
    await popover.present();
  }
}
