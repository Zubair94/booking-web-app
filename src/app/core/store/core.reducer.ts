import { InjectionToken } from '@angular/core';
import { MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '@env/environment';
import { RouterStateUrl } from './router/router.state';
import { guestReducer } from '@store/guest/guest.reducer';
import { guestHistoryReducer } from '@store/guest-history/guest-history.reducer';
import { GuestState } from './guest/guest.state';
import { GuestHistoryState } from './guest-history/guest-history.state';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  guest: GuestState;
  guestHistory: GuestHistoryState;
}

export const CORE_REDUCERS = new InjectionToken<ActionReducerMap<State>>('CoreReducersToken', {
  factory: () => ({
    router: routerReducer,
    guest: guestReducer,
    guestHistory: guestHistoryReducer
  })
});

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => (state, action) => {
  console.log('action', action);
  console.log('state', state);
  return reducer(state, action);
};

export const metaReducers: MetaReducer<any>[] = !environment.production && environment.debugState ? [debug] : [];
