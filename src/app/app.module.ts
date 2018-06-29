import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RouteReuseStrategy,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { ServiceWorkerModule  } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// .withServerTransition({ appId: 'serverApp' }),
@NgModule({
  declarations: [AppComponent],
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app', pathMatch: 'full' },
        { path: 'app', loadChildren: './pages/menu/menu.module#MenuModule' },
        { path: '**', redirectTo: '/app/detail/299608205', pathMatch: 'full' }
      ],
      { preloadingStrategy: PreloadAllModules }
    ),
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__startTrack'
    }),
    RouterModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    SplashScreen
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
