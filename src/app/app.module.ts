import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackPlayerModule } from './components/track-player/track-player.module';
import { LandingPage } from './pages/landing/landing.page';
import { LetModule } from '@rx-angular/template';
const appInitialize = () => () => {
    (window as any).MusicKit.configure({
      developerToken: environment.musicKitToken,
      app: {
        name: 'Star Track',
        build: '1.0',
        declarativeMarkup: true,
        debug: false,
        features: [
          'player-accurate-timing',
          'api-data-store',
          'api-session-storage',
          'api-artist-include',
        ],
        storefrontId: 'us',
        suppressErrorDialog: false,
      },
    });
    return;
  };
@NgModule({
  declarations: [AppComponent, LandingPage],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    RouterModule,
    TrackPlayerModule,
    LetModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialize,
      multi: true,
      deps: [],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
