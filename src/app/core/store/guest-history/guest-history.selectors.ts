import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './guest-history.reducer';
import { GuestHistoryState } from '@store/guest-history/guest-history.state';

export const guestHistoryState = createFeatureSelector<GuestHistoryState>('guestHistory');

export const selectAllGuestHistory = createSelector(
  guestHistoryState, selectAll
);

export const selectAllGuestHistoryFiltered = createSelector(
  selectAllGuestHistory, (list) => {
    const newList = list.filter(history => !history.checkOutDate);
    console.log(newList);
    return newList;
  }
);
