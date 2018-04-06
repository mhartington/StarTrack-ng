import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import IonicRouteStrategy from './router-reuse-strat';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'app', pathMatch: 'full' },
      { path: 'app', loadChildren: './pages/menu/menu.module#MenuModule' },
      { path: '**', redirectTo: 'app', pathMatch: 'full' },
    ]),
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__startTrack'
    })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
