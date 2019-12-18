import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { MenuController, ToastController } from '@ionic/angular';
import { MusickitConfig } from './providers/musickit-config/musickit-config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    public musickitConfig: MusickitConfig,
    public router: Router,
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // if (isPlatformBrowser(this.platformId)) {
    //   const { SplashScreen, StatusBar } = Plugins;
    //   SplashScreen.hide();
    //   StatusBar.setStyle({ style: StatusBarStyle.Light });
    // }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      }
    });
  }
  async ngOnInit() {
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            text: 'Reload',
            role: 'cancel'
          }
        ]
      });
      await toast.present();
      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }
  login() {
    this.musickitConfig.authorize();
  }
  logout() {
    this.musickitConfig.unauthorize();
    this.menuCtrl.close();
  }
}
