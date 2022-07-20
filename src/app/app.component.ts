import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {
  IonicModule,
  MenuController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { Browser } from '@capacitor/browser';
import { App, URLOpenListenerEvent} from '@capacitor/app'
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template';
import { TrackPlayerComponent } from './components/track-player/track-player.component';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    TrackPlayerComponent,
    LetModule,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  musicKitInstance = (window as any).MusicKit.getInstance();
  musicKitEvents = (window as any).MusicKit.Events;
  isAuthorized = new BehaviorSubject(this.musicKitInstance.isAuthorized);

  constructor(
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    private metaService: Meta,
    public platform: Platform
  ) {
    const prefersDark = matchMedia('(prefers-color-scheme: dark)');
    this.setMetaTheme();
    this.setupListener();
    prefersDark.addEventListener('change', () => this.setMetaTheme());

    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      this.authDidChange.bind(this)
    );
    if (Capacitor.isNativePlatform) {
      this.overridewindow();
    }
  }
  overridewindow() {
    const og =  window.open;
    window.open = (
      url?: string | URL,
      target?: string,
      features?: string
    ): any => {
      console.log(url);
      const formattedURL = new URL(url);
      const params = formattedURL.searchParams;
      let referrer = params.get('referrer')
      if(referrer.includes('http://192.168.1.216:8100/')){
        referrer = referrer.replace('http://192.168.1.216:8100/', 'startrack-ng://app/')
      }
      params.set('referrer', referrer);
      formattedURL.search = params.toString();
      console.log(formattedURL.toString());
      og(formattedURL)
      return;
      // Browser.open({ url: formattedURL.toString(), });
    };
  }
  authDidChange() {
    this.isAuthorized.next(this.musicKitInstance.isAuthorized);
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
          .then(() => window.location.reload());
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
  async setupListener() {
    console.log('is here')
    App.addListener('appUrlOpen', (data: URLOpenListenerEvent) => {
      console.log('App opened with URL:', JSON.stringify(data));
      const openUrl = data.url;
      alert(openUrl);
      // Use URL for routing to the right page!
    });

    // Alternative easy way to access the value once
    let res = await App.getLaunchUrl();
    console.log(res);
  }
}
