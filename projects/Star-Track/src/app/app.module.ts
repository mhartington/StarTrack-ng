import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'app', pathMatch: 'full' },
      { path: 'app', loadChildren: './pages/menu/menu.module#MenuModule' }
    ]),
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__startTrack'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
