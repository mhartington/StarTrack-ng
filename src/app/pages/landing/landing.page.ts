import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
} from '@angular/core';
import { RouterLink } from '@angular/router';
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

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class LandingPage {
  ev: BeforeInstallPromptEvent;

  constructor() {
    addIcons({ musicalNotes });
    afterNextRender(() => {
      window.addEventListener('beforeinstallprompt', (ev) => (this.ev = ev));
    });
  }
  handleEnter($event: KeyboardEvent) {
    $event.target.dispatchEvent(new Event('click'));
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
