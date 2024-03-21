import { WritableSignal, effect, signal } from '@angular/core';

export const parseNext = (next: string, fallback = 0): number =>
  next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;




export type LocalStorageOptions<T> = { defaultValue?: T };

export function localStorageSignal( key: string, options: LocalStorageOptions<undefined>,): WritableSignal<unknown>;
export function localStorageSignal<T>( key: string, options?: Omit<LocalStorageOptions<T | undefined>, 'defaultValue'>,): WritableSignal<T | undefined>;
export function localStorageSignal<T>( key: string, options?: LocalStorageOptions<T>,): WritableSignal<T>;
export function localStorageSignal<T = undefined>( key: string, options?: LocalStorageOptions<T | undefined>,): WritableSignal<T | undefined> {
  const defaultValue = options?.defaultValue;
  const internalSignal = signal(defaultValue);

  if (defaultValue !== null && localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }

  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    internalSignal.set(JSON.parse(storedValue));
  }

  effect(() => {
    localStorage.setItem(key, JSON.stringify(internalSignal()));
  });

  globalThis.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === key) {
      if (e.newValue) {
        const newVal = JSON.parse(e.newValue);
        internalSignal.set(newVal);
      }
    }
  });

  return internalSignal;
}
