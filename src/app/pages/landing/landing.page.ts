import { Component, OnInit, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  ev: any;
  items= Array.from(new Array(50).keys());
  constructor(
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {


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
