import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, Events } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SwUpdate } from '@angular/service-worker';
import { Storage } from '@ionic/storage';
// import { fromEvent } from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public favorites = [];
  constructor(
    plt: Platform,
    statusBar: StatusBar,
    splash: SplashScreen,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private storage: Storage,
    private event: Events
  ) {
    // fromEvent(window, 'beforeinstallprompt').subscribe((res:any) => {
    //   res.preventDefault();
    //   res.prompt();
    //   res.userChoice.then(choiceResult => {
    //     if (choiceResult.outcome === 'accepted') {
    //       console.log('User accepted the A2HS prompt');
    //     } else {
    //       console.log('User dismissed the A2HS prompt');
    //     }
    //   });
    // })
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
    toast.onDidDismiss().then(() => {
      this.swUpdate.activateUpdate();
      window.location.reload();
    });

    this.getKeys();
    this.event.subscribe(
      'songAdded',
      e => (this.favorites = [...this.favorites, e])
    );
    this.event.subscribe('songRemoved', e => {
      console.log(e);
      return (this.favorites = this.favorites.filter(
        entry => entry.trackId !== e.trackId
      ));
    });
  }
  getKeys() {
    this.storage.forEach(entry => {
      if (typeof entry !== 'boolean') {
        this.favorites.push(entry);
      }
    });
  }
}
