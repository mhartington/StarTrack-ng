import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  IonButton,
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
import { SongContextMenuComponent } from '../song-contenxt-menu/song-context-menu.component';

@Component({
  selector: 'song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    IonSkeletonText,
    IonIcon,
    IonNote,
    IonText,
    IonItem,
  ],
})
export class SongItemComponent {
  song = input<Song>();
  index = input<number>(0);
  color = input<string>();
  disabled = input<boolean>(false);

  onClick = output();
  
  private popoverCtrl = inject(PopoverController);
  handleClick() {
    this.onClick.emit();
  }
  constructor() {
    addIcons({
      ellipsisHorizontal,
    });
  }
  async showMore(e: MouseEvent) {
    e.stopPropagation();
    const popover = await this.popoverCtrl.create({
      component: SongContextMenuComponent,
      componentProps: { song: this.song },
      event: e,
    });
    await popover.present();
  }
}
