import { Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer<T, V extends Action = Action>(reducer: ActionReducer<any>): ActionReducer<T, V> {
  const storageKeySerializer = (key) => {
    return 'APP_SESSION';
  };

  return localStorageSync({
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer,
    keys: [{ auth: ['status'] }]
  })(reducer);
}
