import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { catchError, debounceTime } from 'rxjs/operators';
import { ItunesService } from '../../providers/itunes/itunes.service';
import { Events, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { trigger, style, animate, transition } from '@angular/animations';
import { EMPTY } from 'rxjs';
import { MusicCardComponent } from '../../components/music-card/music-card.component';
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
export class TrackDetailPage implements OnInit {
  @ViewChild('musicCard') musicCard: MusicCardComponent;
  public track;
  public isFavorite = false;
  public favoriteIcon = 'star-outline';
  public canShare = false;
  show = false;
  constructor(
    public events: Events,
    public storage: Storage,
    public toastCtrl: ToastController,
    public itunes: ItunesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(){
    if ('share' in navigator) {
      console.log('share is there')
      this.canShare = true;
    }
  }
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
    if (!this.isFavorite) {
      this.toastCtrl
        .create({
          message: 'Song added to Favorites',
          duration: 3000,
          position: 'bottom'
        })
        .then(toast => toast.present());
      this.isFavorite = true;
      this.favoriteIcon = 'star';
      this.storage.set(this.track.trackId, this.track);
      this.events.publish('songAdded', this.track);
    } else {
      this.toastCtrl
        .create({
          message: 'Song remove to Favorites',
          duration: 3000,
          position: 'bottom'
        })
        .then(toast => toast.present());
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
  share() {
    if ('share' in navigator) {
      navigator['share']({
        title: 'Star Track',
        text: `Check out "${this.track.trackName}" by ${
          this.track.artistName
        }. Via Star Track.`,
        url: `${window.location.origin}/detail/${this.track.trackId}`
      })
        .then(
          () => console.log('Successful share'),
          error => console.log('Error sharing', error))
    }
  }
}
