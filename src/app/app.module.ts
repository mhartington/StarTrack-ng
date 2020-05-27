import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackPlayerModule } from './components/track-player/track-player.module';
import { LandingPage } from './pages/landing/landing.page';
import { FormsModule } from '@angular/forms';
import { PushModule } from '@rx-angular/template';

@NgModule({
  declarations: [AppComponent, LandingPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule,
    TrackPlayerModule,
    PushModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    (window as any).MusicKit.configure({
      developerToken: environment.musicKitToken,
      app: {
        name: 'Star Track',
        build: '1.0',
      },
    });
  }
}
