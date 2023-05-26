import { Component, inject, OnInit, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {
  IonicModule,
  MenuController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Meta } from '@angular/platform-browser';
import { Browser } from '@capacitor/browser';
import { App, URLOpenListenerEvent} from '@capacitor/app'
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { TrackPlayerComponent } from './components/track-player/track-player.component';
import { CommonModule } from '@angular/common';
// import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    TrackPlayerComponent,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {

    private swUpdate = inject(SwUpdate);
    private toastCtrl = inject(ToastController);
    private menuCtrl = inject(MenuController);
    private metaService = inject(Meta);
    public platform = inject(Platform);


  musicKitInstance = globalThis.MusicKit?.getInstance();
  musicKitEvents = globalThis.MusicKit?.Events;
  isAuthorized = signal(this.musicKitInstance.isAuthorized);

  constructor(
  ) {
    const prefersDark = matchMedia('(prefers-color-scheme: dark)');
    this.setMetaTheme();
    // this.setupListener();
    prefersDark.addEventListener('change', () => this.setMetaTheme());

    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      ()=> this.isAuthorized.set(this.musicKitInstance.isAuthorized)
    );
    // console.log(Capacitor.isNativePlatform)
    // if (Capacitor.isNativePlatform) {
    //   this.overridewindow();
    // }
  }
  overridewindow() {
    const og =  window.open;
    window.open = (
      url?: string | URL,
      target?: string,
      features?: string
    ): any => {
      const formattedURL = new URL(url);
      console.log('url: ', formattedURL.href)
      const params = formattedURL.searchParams;
      params.forEach(param => console.log('param: ', param));

      let referrer = params.get('referrer')
      console.log('referrer: ', referrer)
      if(!referrer.includes('http://startrack-ng.web.app/')){
        console.log('referrer should be reset')
        referrer = 'startrack-ng://app/'
      console.log('referrer: ', referrer)
      }
      params.set('referrer', referrer);
      let newReferrer = params.get('referrer')
      console.log('new referrer: ', newReferrer)

      formattedURL.search = params.toString();
      console.log('updated url: ', formattedURL)
      // og(formattedURL)
      // return;
      Browser.open({ url: formattedURL.toString(),presentationStyle: 'popover' });
    };
  }
  async ngOnInit() {
    if (environment.production) {
      const hasUpdate = await this.swUpdate.checkForUpdate();
      if (hasUpdate) {
        const toast = await this.toastCtrl.create({
          message: 'Update available!',
          position: 'bottom',
          buttons: [
            {
              text: 'Reload',
              role: 'cancel',
            },
          ],
        });
        await toast.present();
        toast
          .onDidDismiss()
          .then(() => this.swUpdate.activateUpdate())
          .then(() => globalThis.location.reload());
      }
    }
  }
  async login() {
    const res = await this.musicKitInstance.authorize();
    console.log(res)
  }
  async logout() {
    await this.musicKitInstance.unauthorize();
    this.menuCtrl.close();
  }
  setMetaTheme() {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--ion-background-color')
      .replace(/\s+/g, '');

    this.metaService.updateTag({ content: color, name: 'theme-color' });
  }
  // async setupListener() {
  //   console.log('is here')
  //   App.addListener('appUrlOpen', (data: URLOpenListenerEvent) => {
  //     console.log('App opened with URL:', JSON.stringify(data));
  //     const openUrl = data.url;
  //     // Use URL for routing to the right page!
  //   });
  //
  //   // Alternative easy way to access the value once
  //   let res = await App.getLaunchUrl();
  //   console.log(res);
  // }
}
