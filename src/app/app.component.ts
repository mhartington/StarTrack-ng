import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    plt: Platform,
    statusBar: StatusBar,
    splash: SplashScreen,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) {
    plt.ready().then(() => {
      statusBar.styleLightContent();
      splash.hide();
    });
  }
  async ngOnInit() {
    const toast = await this.toastCtrl.create({
      message: 'Update available!',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: `Reload`
    });
    this.swUpdate.available.subscribe(async res => {
      console.log('update ready', res);
      await toast.present();
    });
    toast.onDidDismiss().then(() => this.swUpdate.activateUpdate());
  }
}
