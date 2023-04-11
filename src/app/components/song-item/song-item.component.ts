import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MsToMinsPipe } from '../../pipes/ms-to-mins/ms-to-mins.pipe';

@Component({
  selector: 'song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, MsToMinsPipe],
})
export class SongItemComponent {
  @Input() song: any;
  @Input() index = null;
  @Input() color: string;
  constructor() {}
}
