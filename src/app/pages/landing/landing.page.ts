import { Component, OnInit, Inject, inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class LandingPage implements OnInit {
  ev: any;
  items = Array.from(new Array(50).keys());
  private platformId = inject(PLATFORM_ID);
  constructor() {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'beforeinstallprompt').subscribe((res: any) => {
        console.log(res);
        this.ev = res;
      });
    }
  }
  push() {
    Notification.requestPermission().then((result) => {
      console.log('push: ', result);
    });

    if (this.ev) {
      this.ev.preventDefault();
      this.ev.prompt();
      this.ev.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    }
  }
}
