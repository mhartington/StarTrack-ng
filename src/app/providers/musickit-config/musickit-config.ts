import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MusickitConfig {
  musicKit: any = null;
  constructor() {
    (window as any).MusicKit.configure({
      developerToken: environment.musicKitToken,
      app: {
        name: 'Star Track',
        build: '1.0',
      },
    });
    this.musicKit = (window as any).MusicKit.getInstance();
  }
}
