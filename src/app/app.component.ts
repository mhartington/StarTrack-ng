import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MenuController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Meta } from '@angular/platform-browser';
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
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    private metaService: Meta
  ) {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.setMetaTheme();
    prefersDark.addEventListener('change', () => this.setMetaTheme());

    this.musicKitInstance.addEventListener(
      this.musicKitEvents.authorizationStatusDidChange,
      this.authDidChange.bind(this)
    );
  }
  authDidChange() {
    this.isAuthorized.next(this.musicKitInstance.isAuthorized);
  }
  ngOnInit() {
    this.swUpdate.available.subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            text: 'Reload',
            role: 'cancel',
          },
        ],
      });
      await toast.present();
      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }
  login() {
    this.musicKitInstance.authorize();
  }
  async logout() {
    await this.musicKitInstance.unauthorize();
    this.menuCtrl.close();
  }
  setMetaTheme() {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--ion-background-color')
      .replace(/\s+/g, '');
    this.metaService.updateTag({ content: color, name: 'theme-color' });
  }
}
