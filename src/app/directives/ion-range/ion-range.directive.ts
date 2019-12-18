import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';
import { IonRange } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ion-range'
})
export class IonRangeDirective {
  @Output() public ionEnd: EventEmitter<RangeValue> = new EventEmitter();

  public constructor(protected elemRef: ElementRef<IonRange>) {}

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  public onEnd(ev: Event): void {
    ev.preventDefault();
    this.ionEnd.emit(this.elemRef.nativeElement.value);
  }
}
