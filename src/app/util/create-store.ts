import {computed, SettableSignal, signal, Signal} from '@angular/core';

type StoreSnapshot<TState extends object> = {
  [TKey in keyof TState]: TState[TKey] extends object
    ? StoreSnapshot<TState[TKey]> & Signal<TState[TKey]>
    : Signal<TState[TKey]>;
};

export type Store<TState extends object> = {
  mutate: SettableSignal<TState>['mutate'];
  update: SettableSignal<TState>['update'];
  reset: () => void;
} & StoreSnapshot<TState>;

export function createStore<TState extends object>(
  initialState: TState
): Store<TState> {
  const state = signal(initialState);
  const computedCache = new Map<string, Signal<any>>();

  const api = {
    mutate: state.mutate.bind(state),
    update: state.update.bind(state),
    reset: () => state.set(initialState),
  };

  const makeComputed = (obj: Record<string, any>, rootKeys: string[] = []) => {
    const rootObj = rootKeys.reduce(
      (acc, path) => {
        acc['self'] = (acc['self'] as Record<string, any>)[path];
        const original = acc['state'] as () => any;
        acc['state'] = () => original()[path];
        return acc;
      },
      { self: api, state: () => state() }
    );

    for (const key in obj) {
      const keys = [...rootKeys, key];
      const path = keys.join('.');
      Object.defineProperty(rootObj.self, key, {
        configurable: false,
        enumerable: false,
        get: () => {
          if (!computedCache.has(path)) {
            computedCache.set(
              path,
              computed(
                () =>
                  rootObj.state()[key as keyof ReturnType<typeof rootObj.state>]
              )
            );
          }

          return computedCache.get(path);
        },
      });

      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        makeComputed(obj[key], keys);
      }
    }
  };

  makeComputed(initialState);

  return api as Store<TState>;
}
