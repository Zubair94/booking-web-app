import { InjectionToken } from '@angular/core';
import { MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '@env/environment';
import { RouterStateUrl } from './router/router.state';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const CORE_REDUCERS = new InjectionToken<ActionReducerMap<State>>('CoreReducersToken', {
  factory: () => ({
    router: routerReducer
  })
});

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => (state, action) => {
  console.log('action', action);
  console.log('state', state);
  return reducer(state, action);
};

export const metaReducers: MetaReducer<any>[] = !environment.production && environment.debugState ? [debug] : [];
