import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@store/router/router.state';
import { State } from '@store/core.reducer';

export const routerState = createFeatureSelector<State, RouterReducerState<RouterStateUrl>>('router');
export const selectRouterState = createSelector(routerState, state => state.state);
