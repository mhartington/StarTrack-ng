import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { SwUpdate } from '@angular/service-worker';
import { MenuController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  musicKitInstance = (window as any).MusicKit.getInstance();
  musicKitEvents = (window as any).MusicKit.Events;
  isAuthorized = new BehaviorSubject(this.musicKitInstance.isAuthorized);
  constructor(
    // private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    public router: Router
  ) {
    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      this.authDidChange.bind(this)
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
  authDidChange() {
    this.isAuthorized.next(this.musicKitInstance.isAuthorized);
  }
  ngOnInit() {
  //   this.swUpdate.available.subscribe(async () => {
  //     const toast = await this.toastCtrl.create({
  //       message: 'Update available!',
  //       position: 'bottom',
  //       buttons: [
  //         {
  //           text: 'Reload',
  //           role: 'cancel',
  //         },
  //       ],
  //     });
  //     await toast.present();
  //     toast
  //       .onDidDismiss()
  //       .then(() => this.swUpdate.activateUpdate())
  //       .then(() => window.location.reload());
  //   });
  }
  login() {
    this.musicKitInstance.authorize();
  }
  logout() {
    this.musicKitInstance.unauthorize();
    this.menuCtrl.close();
  }
}
