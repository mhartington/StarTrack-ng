import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss']
})
export class PlaylistsPage {
  playlist: any;
  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
    private player: PlayerService
  ) {}

  ionViewDidEnter() {
    const id = this.route.snapshot.params.id;
    this.api.fetchPlaylist(id).subscribe(playlist => {
      this.playlist = playlist;
    });
  }

  playAlbum(shuffle = false) {
    if (shuffle) {
      this.player.toggleShuffleOn();
    }
    this.player
      .setQueueFromItems(this.playlist.relationships.tracks.data)
      .subscribe(() => {
        if (shuffle) {
          this.player.toggleShuffleOff();
        }
      });
  }
  playSong(index: any) {
    this.player
      .setQueueFromItems(this.playlist.relationships.tracks.data, index)
      .subscribe();
  }
}
