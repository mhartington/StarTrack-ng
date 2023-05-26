import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Song } from 'src/@types/song';
import { MsToMinsPipe } from '../../pipes/ms-to-mins/ms-to-mins.pipe';
import { SongContextMenuComponent } from '../song-contenxt-menu/song-context-menu.component';

@Component({
  selector: 'song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, MsToMinsPipe],
})
export class SongItemComponent {
  @Input() song: Song;
  @Input() index = null;
  @Input() color: string;

  private popoverCtrl = inject(PopoverController);

  async showMore(e: any) {
    
    e.stopPropagation();
    const popover = await this.popoverCtrl.create({
      component: SongContextMenuComponent,
      componentProps: { song: this.song, },
      event: e,
    });
    await popover.present();
  }
}
