import { environment } from '../../../environments/environment';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { from } from 'rxjs';
declare var MusicKit: any;
@Injectable({
  providedIn: 'root'
})
export class MusickitConfig {
  musicKit: any = null;
  constructor(
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  // @Inject(DOCUMENT) private doc: Document
  //
  init() {
    if (isPlatformBrowser(this.platformId)) {
      // return new Promise((res, rej) => {
      // const script: HTMLScriptElement = this.doc.createElement('script');
      // script.src = 'https://js-cdn.music.apple.com/musickit/v1/musickit.js';
      // this.doc.body.appendChild(script);
      // script.onload = () => {
      console.log('script loaded');
      MusicKit.configure({
        developerToken: environment.musicKitToken,
        app: {
          name: 'Star Track',
          build: '1.0'
        }
      });
      this.musicKit = MusicKit.getInstance();
      //     return res();
      //   };
      // });
    }
  }

  authorize(): void {
    from(this.musicKit.authorize()).subscribe();
  }
  unauthorize(): void {
    from(this.musicKit.unauthorize()).subscribe();
  }
  get isAuthorized() {
    if (this.musicKit) {
      return this.musicKit.isAuthorized;
    } else {
      return false;
    }
  }
}
