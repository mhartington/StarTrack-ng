import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';
import { ModalController } from '@ionic/angular';
import { DetailModalComponent } from 'src/app/components/detail-modal/detail-modal.component';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss']
})
export class BrowsePage implements OnInit {
  isLoading = true;
  topAlbums: any;
  topPlaylists: any;
  hasError = false;
  topSongs: any;
  constructor(
    private api: MusickitService,
    private player: PlayerService,
    private modalCtrl: ModalController
  ) {}
  ngOnInit() {}
  ionViewDidEnter() {
    console.log('ionViewDidEnter FIRE');
    if (this.isLoading) {
      this.api.fetchChart().subscribe(
        data => {
          this.topAlbums = data.albums[0].data;
          this.topPlaylists = data.playlists[0].data;
          this.topSongs = data.songs[0].data;
          this.isLoading = false;
        },
        () => {
          this.hasError = true;
          this.isLoading = false;
        }
      );
    }
  }
  playSong(index: any) {
    console.log(index);
    this.player.setQueueFromItems(this.topSongs, index).subscribe();
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent
    });

    await modal.present();
  }
}
