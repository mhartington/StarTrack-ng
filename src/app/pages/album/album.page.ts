import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../../@types/model/model';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';
@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss']
})
export class AlbumPage {
  album: Album;
  canShare = false;
  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
    private player: PlayerService,
  ) {}
  ionViewDidEnter() {
    if ('share' in navigator) {
      console.log('share is there');
      this.canShare = true;
    }
    const id = this.route.snapshot.params.id;
    this.api.fetchAlbum(id)
    .subscribe(
      album => (this.album = album),
      err => console.log('err', err),
    )

  }

  playSong(index: number) {
    this.player
      .setQueueFromItems(this.album.relationships.tracks.data, index)
      .subscribe();
  }
  playAlbum(event: any) {
    if (event.shuffle) {
      this.player.toggleShuffleOn();
    }
    this.player
      .setQueueFromItems(this.album.relationships.tracks.data)
      .subscribe(() => {
        if (event.shuffle) {
          this.player.toggleShuffleOff();
        }
      });
  }
  share() {
    if ('share' in navigator) {
      (navigator as any)
        .share({
          title: 'Star Track',
          text: `Check out "${this.album.attributes.name}" by ${
            this.album.attributes.artistName
          }. Via Star Track.`,
          url: `${window.location.origin}/album/${this.album.id}`
        })
        .then(
          () => console.log('Successful share'),
          error => console.log('Error sharing', error)
        );
    }
  }
}
