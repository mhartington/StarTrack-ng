import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser';
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
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
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
    NgIf,
    RouterLink, RouterLinkActive
  ],
})
export class MenuComponent {
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

    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      () => this.isAuthorized.set(this.musicKitInstance.isAuthorized)
    );


    console.log(Capacitor.isNativePlatform)
    if (Capacitor.isNativePlatform) {
      this.overridewindow();
    }
  }


  // overridewindow() {
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
  // }

  async login() {
    await this.musicKitInstance.authorize();
  }
  async logout() {
    await this.musicKitInstance.unauthorize();
    // this.menuCtrl.close();
  }
}
