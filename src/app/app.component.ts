import { SwUpdate } from '@angular/service-worker';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    plt: Platform,
    statusBar: StatusBar,
    splash: SplashScreen
  ) {
    plt.ready().then(() => {
      statusBar.styleLightContent();
      splash.hide();
    });
  }
  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(_evt => {
        console.log('service worker updated');
      });

      this.swUpdate
        .checkForUpdate()
        .then(() => {
          // noop
        })
        .catch(err => {
          console.error('error when checking for update', err);
        });
    }
  }
}
