import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { MusickitConfig } from './providers/musickit-config/musickit-config';
import {
  PlaybackStates,
  PlayerService
} from './providers/player/player.service';

// import { fromEvent } from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [
    `
      ion-label {
        padding-left: 10px;
      }
      ion-split-pane {
        margin-bottom: calc(var(--ion-safe-area-bottom) + 58px);
      }
      .login {
        display: block;
        position: relative;
        -ms-flex-order: 1;
        order: 1;
        width: 100%;
        z-index: 10;
      }
      .mh-footer {
        position: absolute;
        bottom: 0;
      }

      img {
        object-fit: cover;
      }
      .mh-toolbar {
        border-top-width: 0.55px;
        border-top-color: rgba(0, 0, 0, 0.2);
        border-top-style: solid;
        min-height: calc(var(--ion-safe-area-bottom) + 58px);
        display: grid;
        grid-template-columns: 48px auto 81px;
        grid-gap: 10px;
        padding: 4px calc(16px + var(--ion-safe-area-left));
        background: var(--ion-background-color);
        color: #444;
        padding-bottom: var(--ion-safe-area-bottom);
      }

      .active {
        color: var(--ion-color-primary);
        ion-icon {
          color: var(--ion-color-primary);
        }
      }

      .split-pane-md.split-pane-visible > .split-pane-side {
        max-width: 375px;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  public favorites = [];
  public playbackStates = PlaybackStates;
  constructor(
    plt: Platform,
    statusBar: StatusBar,
    splash: SplashScreen,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    public player: PlayerService,
    public musicKitService: MusickitConfig
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
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: `Reload`
      });
      console.log('update ready', res);
      await toast.present();
      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }
  login() {
    this.musicKitService.authorize();
  }
  logout() {
    this.musicKitService.unauthorize();
    this.menuCtrl.close();
  }
  togglePlay() {
    if (this.player.playbackState === this.playbackStates.PAUSED) {
      this.player.play().subscribe();
    } else {
      this.player.pause().subscribe();
    }
  }
  next() {
    this.player.skipToNextItem().subscribe();
  }
  prev() {
    this.player.skipToPreviousItem().subscribe();
  }

}
