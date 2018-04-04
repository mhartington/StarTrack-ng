import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ItunesService } from '../../providers/itunes/itunes.service';
import { Events, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'track-detail-page',
  templateUrl: './track-detail.page.html',
  styleUrls: ['./track-detail.page.scss']
})
export class TrackDetailPage implements OnInit {
  @ViewChild('musicCard') musicCard;
  public track;
  public isFavorite = false;
  public favoriteIcon = 'star-outline';

  constructor(
    public events: Events,
    // public nativeMedia: NativeMedia,
    public storage: Storage,
    public toastCtrl: ToastController,
    public service: ItunesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.service.loadSong(id).subscribe(
      res => this.track = res,
      err => console.log(err),
      () => this.checkStorage()
    );
  }
  checkStorage() {
    this.storage.get(this.track.trackId).then(res => {
      if (!res) {
        this.isFavorite = false;
        this.favoriteIcon = 'star-outline';
      } else {
        this.isFavorite = true;
        this.favoriteIcon = 'star';
      }
    });
  }
  toggleFavorites() {
    let addedToast = {
      message: 'Song added to Favorites',
      duration: 3000,
      position: 'bottom'
    };
    let removedToast = {
      message: 'Song remove to Favorites',
      duration: 3000,
      position: 'bottom'
    };
    if (!this.isFavorite) {
      this.toastCtrl.create(addedToast).then(toast => toast.present())
      this.isFavorite = true;
      this.favoriteIcon = 'star';
      this.storage.set(this.track.trackId, this.track);
      this.events.publish('songAdded', this.track);
    } else {
      this.toastCtrl.create(removedToast).then(toast => toast.present())
      this.storage.remove(this.track.trackId);
      this.isFavorite = false;
      this.favoriteIcon = 'star-outline';
      this.events.publish('songRemoved', this.track);
    }
  }
  ionViewWillLeave() {
    this.musicCard.stopSong();
    // this.nativeMedia.destroy();
  }
}
