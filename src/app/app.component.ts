import { Component, inject, OnInit, signal, isDevMode, ChangeDetectionStrategy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TrackPlayerComponent } from './components/track-player/track-player.component';
import { StatusBar } from '@capacitor/status-bar';
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
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  MenuController,
  Platform,
  ToastController,
  IonItemGroup,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonContent,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TrackPlayerComponent,
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
    IonRouterLink,
    RouterLink,
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
      
    this.setMetaTheme();

    matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => this.setMetaTheme());

    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      () => this.isAuthorized.set(this.musicKitInstance.isAuthorized),
    );
    
    // if (Capacitor.isNativePlatform) {
    //   this.overridewindow();
    // }
  }

  overridewindow() {
    // console.log('foo')
    // window.open = function(url: string, windowName: string, windowFeatures: string) { 
    //
    // console.log('window caught', url, windowName, windowFeatures);
    // window.location.href=url;
    // return null;
  // };
  //   const og = window.open;
  //   window.open = (
  //     url?: string | URL,
  //     target?: string,
  //     features?: string
  //   ): any => {
  //     const formattedURL = new URL(url);
  //     console.log('url: ', formattedURL.href);
  //     const params = formattedURL.searchParams;
  //     params.forEach((param) => console.log('param: ', param));
  //
  //     let referrer = params.get('referrer');
  //     console.log('referrer: ', referrer);
  //     if (!referrer.includes('http://startrack-ng.web.app/')) {
  //       console.log('referrer should be reset');
  //       referrer = 'startrack-ng://app/';
  //       console.log('referrer: ', referrer);
  //     }
  //     params.set('referrer', referrer);
  //     let newReferrer = params.get('referrer');
  //     console.log('new referrer: ', newReferrer);
  //
  //     formattedURL.search = params.toString();
  //     console.log('updated url: ', formattedURL);
  //     // og(formattedURL)
  //     // return;
  //     Browser.open({
  //       url: formattedURL.toString(),
  //       presentationStyle: 'popover',
  //     });
  //   };
  }
  async ngOnInit() {
    if (!isDevMode()) {
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
    await this.musicKitInstance.authorize();
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
}
