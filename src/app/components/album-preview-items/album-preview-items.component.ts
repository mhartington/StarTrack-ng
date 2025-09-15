import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import {
  IonCard,
  IonLabel,
  IonNote,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { Album } from 'src/@types/album';
import { LibraryAlbum } from 'src/@types/library-album';
import { Playlist } from 'src/@types/playlist';

@Component({
  selector: '[album-preview-item]',
  templateUrl: './album-preview-items.component.html',
  styleUrls: ['./album-preview-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonCard, IonLabel, IonNote, IonSkeletonText],
})
export class AlbumPreviewItemsComponent {
  collection = input<Playlist | Album | LibraryAlbum>();
  index = input<number>();
}
