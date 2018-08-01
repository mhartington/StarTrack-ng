import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { catchError, debounceTime } from 'rxjs/operators';
import { ItunesService } from '../../providers/itunes/itunes.service';
import { Events, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { trigger, style, animate, transition } from '@angular/animations';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-track-detail-page',
  templateUrl: './track-detail.page.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: `translate3d(0,10px,0)` }),
        animate(
          '300ms ease-in',
          style({ opacity: 1, transform: `translate3d(0,0,0)` })
        )
      ])
    ])
  ]
})
export class TrackDetailPage {
  @ViewChild('musicCard') musicCard;
  public track;
  public isFavorite = false;
  public favoriteIcon = 'star-outline';
  show = false;
  constructor(
    public events: Events,
    public storage: Storage,
    public toastCtrl: ToastController,
    public itunes: ItunesService,
    private route: ActivatedRoute
  ) {}

  ionViewDidEnter() {
    this.itunes
      .loadSong(this.route.snapshot.params.id)
      .pipe(
        catchError(_e => {
          return EMPTY;
        }),
        debounceTime(500)
      )

      .subscribe(
        res => (this.track = res),
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
      this.toastCtrl.create(addedToast).then(toast => toast.present());
      this.isFavorite = true;
      this.favoriteIcon = 'star';
      this.storage.set(this.track.trackId, this.track);
      this.events.publish('songAdded', this.track);
    } else {
      this.toastCtrl.create(removedToast).then(toast => toast.present());
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
