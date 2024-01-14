import { Component, Input, inject, signal } from '@angular/core';
import { Album } from '../../../@types/album';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service2';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonIcon,
  IonList,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { ErrorComponent } from '../../components/error/error.component';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { LazyImgComponent } from '../../components/lazy-img/lazy-img.component';
import { FormatArtworkUrlPipe } from '../../pipes/formatArtworkUrl/format-artwork-url.pipe';

import { share, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Song } from 'src/@types/song';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    PreviewHeaderComponent,
    SongItemComponent,
    LazyImgComponent,
    FormatArtworkUrlPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonThumbnail,
    IonBackButton,
    IonButton,
    IonContent,
    IonIcon,
    IonList,
    IonRouterOutlet,
  ],
})
export class AlbumPage {
  private api = inject(MusickitService);
  private player = inject(PlayerService);

  public isLoading = signal(true);
  public hasError = signal(false);
  public collection = signal<Partial<Album>>(null);

  public canShare = !!('share' in navigator);

  @Input()
  set id(albumId: string){
    this.api.fetchAlbum(albumId)
    .then((data) => {
      this.collection.set(data);
      this.isLoading.set(false);
    })
  }

  constructor(){
    addIcons({ share, add });
  }
  // async ionViewDidEnter() {
  //   const id = this.route.snapshot.params.id;
  //   const data = await this.api.fetchAlbum(id);
  //   this.collection.set(data);
  //   this.isLoading.set(false);
  // }

  playSong(song: Song, startWith: number, shuffle = false) {
    if(!song.attributes.releaseDate){ return; }
    const url = this.collection().attributes.url;
    this.player.playCollection({ shuffle, url,startWith });
  }

  playAlbum({ shuffle }) {
    const url = this.collection().attributes.url;
    this.player.playCollection({ shuffle, url});
  }

  share() {
    if (this.canShare) {
      navigator
        .share({
          title: 'Star Track',
          text: `Check out "${this.collection().attributes.name}" by ${
            this.collection().attributes.artistName
          }. Via Star Track.`,
          url: `${globalThis.location.origin}/album/${this.collection().id}`,
        })
        .then(
          () => console.log('Successful share'),
          (error) => console.log('Error sharing', error)
        );
    }
  }

  async addToLibrary() {
    const album = this.collection();
    await this.api.addToLibrary(album.id, album.type);
  }
}
