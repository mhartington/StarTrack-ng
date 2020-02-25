import { Injectable, ApplicationRef, NgZone } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public shouldDark = new BehaviorSubject(false);
  constructor(private meta: Meta,private zone: NgZone) {
    // Listen for the prefers-color-scheme media query
    const shouldMatch = window.matchMedia('(prefers-color-scheme: dark)');

    // trigger the next value on the BehaviourSubject
    this.shouldDark.next(shouldMatch.matches);
    this.updateMeta();

    // Listen for subsequent changes
    // tslint:disable-next-line: deprecation
    shouldMatch.addListener(({ matches }) => {
      this.shouldDark.next(matches);
      this.updateMeta();
    });
  }

  updateMeta() {
    this.zone.run(() => {
      const themeColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--ion-background-color');
      this.meta.updateTag({ name: 'theme-color', content: themeColor });
    });
  }
}
