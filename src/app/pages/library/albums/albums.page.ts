import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';
import { AlbumPreviewItemsComponent } from '../../../components/album-preview-items/album-preview-items.component';
import { LazyImgComponent } from '../../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../../pipes/formatArtworkUrl/format-artwork-url.pipe';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';
import { Album } from 'src/@types/album';
import { parseNext } from 'src/app/util';

@Component({
  selector: 'app-library-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    AlbumPreviewItemsComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
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
  trackByItem(_idx: number, item: any) { return item.id; }

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
