import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Input } from '@angular/core';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {
  @Input() favorites;
  constructor(
    private router: Router,
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {}
  goToDetail(favorite) {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['detail', favorite.trackId]);
    });
  }
}
