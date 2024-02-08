import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.page.html',
  styleUrls: ['./recently-added.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AlbumPreviewItemsComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    IonInfiniteScroll,
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
  ],
})
export class RecentlyAddedPage {
  private api = inject(MusickitService);
  private offset = 0;
  public collection = signal<Partial<Album[]>>([]);

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  async ionViewDidEnter() {
    this.collection().length === 0 ? this.fetchCollection() : null;
  }
  async fetchCollection() {
    const res = await this.api.fetchRecentlyAdded(this.offset);
    if(!res.next){
      this.infiniteScroll.disabled = true;
      return;
    } else {
      this.offset = parseNext(res.next);
      this.collection.update((s) => [...s, ...res.data]);
    }
  }

  async fetchNext() {
    if (this.collection().length === 150) {
      this.infiniteScroll.disabled = true;
      return;
    } else {
      await this.fetchCollection();
      this.infiniteScroll.complete();
    }
  }
}
