import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { IonRange } from '@ionic/angular';
@Directive({
  selector: 'ion-range',
})
export class IonRangeDirective {
  @Output() public ionEnd: EventEmitter<Event> = new EventEmitter();
  @Output() public ionStart: EventEmitter<Event> = new EventEmitter();

  public constructor(protected elemRef: ElementRef<IonRange>) {}

  @HostListener('pointerdown', ['$event'])
  public onStart(ev: any){
    this.ionStart.emit(ev);
  }

  @HostListener('pointerup', ['$event'])
  public onEnd(ev: any): void {
    this.ionEnd.emit(ev);
  }
}
