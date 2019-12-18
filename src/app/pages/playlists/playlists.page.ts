import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss']
})
export class PlaylistsPage {
  playlist: any;
  isError = false;
  canShare: boolean;
  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
    private player: PlayerService
  ) {}

  ionViewDidEnter() {
    if ('share' in navigator) {
      console.log('share is there');
      this.canShare = true;
    }
    const id = this.route.snapshot.params.id;
    this.api
      .fetchPlaylist(id)
      .pipe(
        catchError(() => {
          this.isError = true;
          return EMPTY;
        })
      )
      .subscribe(playlist => {
        this.playlist = playlist;
      });
  }

  playAlbum(e) {
    if (e.shuffle) {
      this.player.toggleShuffleOn();
    }
    this.player
      .setQueueFromItems(this.playlist.relationships.tracks.data)
      .subscribe(() => {
        if (e.shuffle) {
          this.player.toggleShuffleOff();
        }
      });
  }
  playSong(index: any) {
    this.player
      .setQueueFromItems(this.playlist.relationships.tracks.data, index)
      .subscribe();
  }

  share() {
    if ('share' in navigator) {
      (navigator as any)
        .share({
          title: 'Star Track',
          text: `Check out "${this.playlist.attributes.name}" by ${
            this.playlist.attributes.curatorName
          }. Via Star Track.`,
          url: `${window.location.origin}/album/${this.playlist.id}`
        })
        .then(
          () => console.log('Successful share'),
          ( error: any) => console.log('Error sharing', error)
        );
    }
  }
}
