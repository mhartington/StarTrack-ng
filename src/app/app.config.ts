import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import {
  provideIonicAngular,
  IonicRouteStrategy,
} from '@ionic/angular/standalone';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

const appInitialize = () => async () =>
  await globalThis.MusicKit.configure({
    developerToken: environment.musicKitToken,
    bitrate: globalThis.MusicKit.PlaybackBitrate.HIGH,
    app: {
      name: 'Star Track',
      build: '1.0',
      declarativeMarkup: false,
      debug: false,
      storefrontId: 'us',
      suppressErrorDialog: true,
      icon: 'https://startrack-ng.web.app/assets/icons/icon-mask.png',
    },
  });

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitialize, multi: true },
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideIonicAngular(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideExperimentalZonelessChangeDetection(),
  ],
};
