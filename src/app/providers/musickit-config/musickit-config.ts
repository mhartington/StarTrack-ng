import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
declare var MusicKit: any;
@Injectable({
  providedIn: 'root'
})
export class MusickitConfig {
  musicKit: any;

  constructor() {
    MusicKit.configure({
      developerToken: environment.musicKitToken,
      app: {
        name: 'Star Track',
        build: '1.0'
      }
    });

    this.musicKit = MusicKit.getInstance();
  }

  authorize(): void {
    from(this.musicKit.authorize()).subscribe();
  }

  unauthorize(): void {
    from(this.musicKit.unauthorize()).subscribe();
  }

  get isAuthorized() {
    return this.musicKit.isAuthorized;
  }
}
