import { ChangeDetectorRef, ViewRef } from '@angular/core';
import { inject } from '@angular/core';

export type Ref<T = any> = { value: T };
export const useState = <STATE extends any>(defaultVal?: STATE): Ref<STATE> => {
  return new RefImpl(defaultVal);
};
class RefImpl<T> {
  private cdr = inject(ChangeDetectorRef) as ViewRef;

  private _value: T;
  constructor(val: any) {
    this._value = toProxy(val);
  }
  get value() {
    return this._value;
  }
  set value(newVal) {
    this._value = toProxy(newVal);
    this.cdr.markForCheck();
  }
}
const toProxy = <T extends unknown>(value: T) => isObject(value) ? createProxy(value) : value;;
export function createProxy(target: any) {
  return new Proxy(target, {
    get(target: any, prop: string) {
      if (isKeyOf(prop, target)) {
        return target[prop];
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (isKeyOf(prop, target)) {
        target[prop] = value;
      } else {
        Reflect.set(target, prop, value);
      }
      return true;
    },
  });
}
export function isKeyOf<T extends Object>(key: any, obj: T): key is keyof T {
  return typeof key === 'string' && Object.keys(obj).includes(key);
}
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';
