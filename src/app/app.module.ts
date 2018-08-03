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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ShellPage } from './pages/shell/shell.page';
import { MenulistModule } from './components/menulist/menulist.module';
@NgModule({
  declarations: [AppComponent, ShellPage],
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', component: ShellPage },
        {
          path: 'search',
          loadChildren: './pages/search/search.module#SearchModule'
        },
        {
          path: 'detail/:id',
          loadChildren:
            './pages/track-detail/track-detail.module#TrackDetailModule'
        },
        { path: '**', redirectTo: '/detail/299608205', pathMatch: 'full' }
      ],
      { preloadingStrategy: PreloadAllModules }
    ),
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__startTrack'
    }),
    MenulistModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    SplashScreen
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
