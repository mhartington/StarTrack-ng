import { Component, inject, OnInit, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {} from '@ionic/angular/common';
import { Meta } from '@angular/platform-browser';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { TrackPlayerComponent } from './components/track-player/track-player.component';
import { CommonModule } from '@angular/common';
import {
  albumsOutline,
  musicalNote,
  logOut,
  logIn,
  timeOutline,
  search,
  gridOutline,
  chevronForward,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  IonApp,
  IonHeader,
  IonSplitPane,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItemGroup,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonMenu,
  IonRouterOutlet,
  MenuController,
  Platform,
  ToastController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    TrackPlayerComponent,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItemGroup,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonRouterOutlet,
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

  constructor() {
    addIcons({
      albumsOutline,
      musicalNote,
      logOut,
      logIn,
      timeOutline,
      search,
      gridOutline,
      chevronForward,
    });
    const prefersDark = matchMedia('(prefers-color-scheme: dark)');
    this.setMetaTheme();
    // this.setupListener();
    prefersDark.addEventListener('change', () => this.setMetaTheme());

    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      () => this.isAuthorized.set(this.musicKitInstance.isAuthorized)
    );
    // console.log(Capacitor.isNativePlatform)
    // if (Capacitor.isNativePlatform) {
    //   this.overridewindow();
    // }
  }
  overridewindow() {
    const og = window.open;
    window.open = (
      url?: string | URL,
      target?: string,
      features?: string
    ): any => {
      const formattedURL = new URL(url);
      console.log('url: ', formattedURL.href);
      const params = formattedURL.searchParams;
      params.forEach((param) => console.log('param: ', param));

      let referrer = params.get('referrer');
      console.log('referrer: ', referrer);
      if (!referrer.includes('http://startrack-ng.web.app/')) {
        console.log('referrer should be reset');
        referrer = 'startrack-ng://app/';
        console.log('referrer: ', referrer);
      }
      params.set('referrer', referrer);
      let newReferrer = params.get('referrer');
      console.log('new referrer: ', newReferrer);

      formattedURL.search = params.toString();
      console.log('updated url: ', formattedURL);
      // og(formattedURL)
      // return;
      Browser.open({
        url: formattedURL.toString(),
        presentationStyle: 'popover',
      });
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
    console.log(res);
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
