import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment as env } from '@app/env';
import { RouterStateModel } from '../../router';
import { logger, localStorageSyncReducer } from '../meta-reducers';

export interface AppState {
  router: RouterReducerState<RouterStateModel>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !env.production
  ? [logger, storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];
