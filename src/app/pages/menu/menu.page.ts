import { Component, OnInit } from '@angular/core';
// import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-menu-page',
  templateUrl: './menu.page.html'
})
export class MenuPage implements OnInit {
  // localIsDark: boolean;
  // constructor(private storage: Storage) {}

  ngOnInit() {
    // this.storage.get('is_dark').then(isDark => {
    //   this.localIsDark = isDark;
    //   if (!!isDark) {
    //     document.body.classList.toggle('dark');
    //   }
    // });
  }
  // toggleDark() {
  //   document.body.classList.toggle('dark');
  //   this.storage.set('is_dark', !this.localIsDark);
  //   this.localIsDark = !this.localIsDark;
  // }
}
