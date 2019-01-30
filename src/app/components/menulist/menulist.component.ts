import { Component, OnInit } from '@angular/core';
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
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {}
}
