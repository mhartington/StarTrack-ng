// import { ViewportScroller } from '@angular/common';

export class IonicViewportScroller {
  private offset: () => [number, number] = () => [0, 0];
  private document: Document = document;
  private window: Window = window;
  // constructor(private document: any, private window: any) {}

  /**
   * @whatItDoes Configures the top offset used when scrolling to an anchor.
   *
   * * When given a number, the service will always use the number.
   * * When given a function, the service will invoke the function every time it restores scroll
   * position.
   */
  setOffset(offset: [number, number] | (() => [number, number])): void {
    if (Array.isArray(offset)) {
      this.offset = () => offset;
    } else {
      this.offset = offset;
    }
  }

  /**
   * Get the leaving views ion-content, and then get the X,Y of the scrollEl
   */
  getScrollPosition(): [number, number] {
    // if (this.supportScrollRestoration()) {
    const pastPages = Array.from(
      this.document.querySelectorAll('.ion-page:not(ion-app)')
    );
    const lastPage = pastPages[pastPages.length - 1];
    const contentEl = lastPage.querySelector('ion-content');
    const scrollEl = contentEl.shadowRoot.querySelector('.inner-scroll');
    return [scrollEl.scrollLeft, scrollEl.scrollTop];
    // }
    // else {
    //   return [0, 0];
    // }
  }

  scrollToPosition(position: [number, number]): void {
    if (this.supportScrollRestoration()) {
      console.log('position is', position);
      const pages = Array.from(this.document.querySelectorAll('.ion-page:not(ion-app)'));
      const lastPage = pages[pages.length - 1];
      const contentEl = lastPage.querySelector('ion-content');
      setTimeout(() => {
        contentEl.scrollToPoint(position[0], position[1]);
      }, 16);
    }
  }

  /**
   * @whatItDoes Scrolls to the provided anchor.
   */
  scrollToAnchor(anchor: string): void {
    if (this.supportScrollRestoration()) {
      const elSelectedById = this.document.querySelector(`#${anchor}`);
      if (elSelectedById) {
        this.scrollToElement(elSelectedById);
        return;
      }
      const elSelectedByName = this.document.querySelector(
        `[name='${anchor}']`
      );
      if (elSelectedByName) {
        this.scrollToElement(elSelectedByName);
        return;
      }
    }
  }

  /**
   * @whatItDoes Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(scrollRestoration: 'auto' | 'manual'): void {
    if (this.supportScrollRestoration()) {
      const history = this.window.history;
      if (history && history.scrollRestoration) {
        history.scrollRestoration = scrollRestoration;
      }
    }
  }

  private scrollToElement(el: any): void {
    const rect = el.getBoundingClientRect();
    const left = rect.left + this.window.pageXOffset;
    const top = rect.top + this.window.pageYOffset;
    const offset = this.offset();
    this.window.scrollTo(left - offset[0], top - offset[1]);
  }

  /**
   * We only support scroll restoration when we can get a hold of window.
   * This means that we do not support this behavior when running in a web worker.
   *
   * Lifting this restriction right now would require more changes in the dom adapter.
   * Since webworkers aren't widely used, we will lift it once RouterScroller is
   * battle-tested.
   */
  private supportScrollRestoration(): boolean {
    try {
      return !!this.window && !!this.window.scrollTo;
    } catch (e) {
      return false;
    }
  }
}
