import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'msToMins',
  pure: true
})
export class MsToMinsPipe implements PipeTransform {
  transform(value?: number) {
    if(value){
      return this.durationFromMsHelper(value);
    }
  }
  pad2(num: any) {
    if (num <= 99) {
      num = ('0' + num).slice(-2);
    }
    return num;
  }
  durationFromMsHelper(ms: number) {
    let x: number = ms / 1000;
    const seconds: number = this.pad2(Math.floor(x % 60));
    x /= 60;
    const minutes: number = this.pad2(Math.floor(x % 60));
    x /= 60;
    const hours: number = Math.floor(x % 24);
    const newHours = hours ? this.pad2(hours) + ':' : '';
    return newHours + minutes + ':' + seconds;
  }
}
