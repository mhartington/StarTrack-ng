import { Component } from '@angular/core';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss']
})
export class BrowsePage {
  isLoading = true;
  topAlbums: any;
  topPlaylists: any;
  topSongs: any;
  constructor(private api: MusickitService, private player: PlayerService) {}
  ngOnInit() {
    this.api.fetchChart().subscribe(data => {
      this.topAlbums = data.albums[0].data;
      this.topPlaylists = data.playlists[0].data;
      this.topSongs = data.songs[0].data;
      this.isLoading = false;
    });
  }
  playSong(index: any) {
    this.player.setQueueFromItems(this.topSongs, index).subscribe();
  }
}
