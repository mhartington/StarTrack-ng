import { Injectable, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  // tslint:disable-next-line: variable-name
  _shouldDark = false;
  get shouldDark() {
    return this._shouldDark;
  }
  set shouldDark(val: boolean) {
    this.doc.documentElement.classList.toggle('dark', val);
    this._shouldDark = val;
  }

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.shouldDark = prefersDark.matches;
      prefersDark.addListener(e => (this.shouldDark = e.matches));
    }
  }
}
