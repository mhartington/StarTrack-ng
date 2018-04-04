import { Component, OnInit, ViewChild } from '@angular/core';
// import {MenulistPage} from '../menulist/menulist.page';
// import { SearchPage } from '../search/search.page';

import { Storage } from '@ionic/storage';
import { Events, NavController } from '@ionic/angular';
import { TrackDetailPage } from '../track-detail/track-detail.page';
@Component({
  selector: 'menu-page',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {
  // public menuListPage = MenulistPage;
  public favorites = [];
  // public searchPage = SearchPage;
  constructor(
    public storage: Storage,
    public event: Events,
    public navCtrl: NavController
  ) {}
  ngAfterViewInit(){
    console.log('menu loaded')
  }
  ngOnInit() {
    this.getKeys();
    this.event.subscribe('songAdded', e => {
      this.favorites.push(e);
    });
    this.event.subscribe('songRemoved', e => {
      console.log(e);
      this.favorites.splice(this.favorites.indexOf(e), 1);
    });
  }
  getKeys() {
    this.storage.forEach(entry => {
      this.favorites.push(entry);
    });
  }
  goToDetail(favorite) {
    let mainNav = document.querySelector('ion-nav[main]') as any;
    mainNav.push(TrackDetailPage, {
      id: favorite.trackId,
      track: favorite
    });
  }
}
