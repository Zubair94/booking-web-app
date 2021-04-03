import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, selectEntities } from './guest.reducer';
import { GuestState } from './guest.state';

export const guestState = createFeatureSelector<GuestState>('guest');

export const selectAllGuest = createSelector(
  guestState, (state) => (
    selectAll(state)
  )
);
export const selectAllGuestEntities = createSelector(
  guestState,
  selectEntities
);
export const selectGuestById = createSelector(
  selectAllGuestEntities,
  (guestList, props) => (guestList[props.id])
);
