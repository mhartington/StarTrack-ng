import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(plt: Platform, statusBar: StatusBar, splash: SplashScreen) {
    plt.ready().then(() => {
      statusBar.styleLightContent();
      splash.hide();
    });
  }
}
