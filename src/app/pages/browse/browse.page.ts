import { Component, OnInit } from '@angular/core';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss']
})
export class BrowsePage implements OnInit {
  isLoading = true;
  topAlbums: any;
  topPlaylists: any;
  topSongs: any;
  constructor(
    private menuCtrl: MenuController,
    private api: MusickitService,
    private player: PlayerService
  ) {}
  ngOnInit() {
    this.menuCtrl.enable(true);
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter FIRE');
    if (this.isLoading) {
      this.api.fetchChart().subscribe(data => {
        this.topAlbums = data.albums[0].data;
        this.topPlaylists = data.playlists[0].data;
        this.topSongs = data.songs[0].data;
        this.isLoading = false;
      });
    }
  }
  playSong(index: any) {
    this.player.setQueueFromItems(this.topSongs, index).subscribe();
  }
}
