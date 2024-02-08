import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { AlbumPreviewItemsComponent } from '../../../components/album-preview-items/album-preview-items.component';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import { Album } from '../../../../@types/album';
import { parseNext } from '../../../util';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-library-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AlbumPreviewItemsComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    RouterLinkWithHref,
  ],
})
export class AlbumsPage {
  private api = inject(MusickitService);
  private offset = 0;
  private total = 0;
  public albums = signal<Partial<Album[]>>([]);

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  async ionViewDidEnter() {
    this.albums().length === 0 ? this.fetchAlbums() : null;
  }

  async fetchAlbums() {
    const res = await this.api.fetchLibraryAlbums(this.offset);
    this.offset = parseNext(res.next);
    this.total = res.meta.total;
    this.albums.update((s) => [...s, ...res.data]);
  }

  async fetchNext() {
    if (this.albums().length === this.total) {
      this.infiniteScroll.disabled = true;
      return;
    } else {
      await this.fetchAlbums();
      this.infiniteScroll.complete();
    }
  }
}
