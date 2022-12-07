import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { LetModule, PushModule } from '@rx-angular/template';

@Component({
  selector: 'app-login-modal',
  template: `
      <ion-header>
          <ion-toolbar>
            <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <iframe
          src="https://authorize.music.apple.com/woa?a=eyJ0aGlyZFBhcnR5SWNvblVSTCI6Imh0dHBzOi8vc3RhcnRyYWNrLW5nLndlYi5hcHAvYXNzZXRzL2ljb25zL2ljb24tbWFzay5wbmciLCJ0aGlyZFBhcnR5TmFtZSI6ImxvY2FsaG9zdDo4MTAwIiwidGhpcmRQYXJ0eVRva2VuIjoiZXlKaGJHY2lPaUpGVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0lzSW10cFpDSTZJbEF5TkZwVFJqUlhRaklpZlEuZXlKcFlYUWlPakUyTmpRNE1EUTRNakVzSW1WNGNDSTZNVFk0TURNMU5qZ3lNU3dpYVhOeklqb2lPVmxPTWtoVk5UbExPQ0o5LmZEVXlNWklkVGhySmRZYVRQSk9fWk9WSFUxNmdrblVJZXZFUDUxbW5RRUZRbHduamY4bnF6NW8xb3BxTkV5c0ZYdWc5OHhza0xlRHc4djB0Rk4tRU1nIn0%3D&referrer=http%3A%2F%2Flocalhost%3A8100%2Fbrowse&app=music&p=subscribe"></iframe>
      </ion-content>
  `,
  styles: [
    `
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        }
    `
  ],
  // styleUrls: ['./player-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    LetModule,
    PushModule,
  ],
})
export class LoginModalComponent {
}
