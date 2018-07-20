import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Events, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {
  public favorites = [];
  constructor(
    private router: Router,
    public event: Events,
    public storage: Storage,
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.getKeys();
    this.event.subscribe(
      'songAdded',
      e => (this.favorites = [...this.favorites, e])
    );
    this.event.subscribe(
      'songRemoved',
      e =>
        (this.favorites = this.favorites.filter(
          entry => entry.trackId !== e.trackId
        ))
    );
  }
  getKeys() {
    this.storage.forEach(entry => {
      if (typeof entry !== 'boolean') {
        this.favorites.push(entry);
      }
    });
  }
  goToDetail(favorite) {
    this.menuCtrl.close().then(() => {
      this.router.navigateByUrl(`/app/detail/${favorite.trackId}`);
    });
  }
}
