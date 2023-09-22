import { Component, OnInit, inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { musicalNotes } from 'ionicons/icons';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonContent,
    IonIcon,
  ],
})
export class LandingPage implements OnInit {
  handleEnter($event: KeyboardEvent) {
    $event.target.dispatchEvent(new Event('click'));
  }
  ev: any;
  items = Array.from(new Array(50).keys());
  private platformId = inject(PLATFORM_ID);
  constructor() {
    addIcons({ musicalNotes });
  }
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
