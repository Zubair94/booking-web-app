import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as GuestHistoryActions from './guest-history.actions';
import { GuestHistory } from '@typings/guest-history';
import { GuestHistoryState } from './guest-history.state';

export const guestHistoryEntityAdapter: EntityAdapter<GuestHistory> = createEntityAdapter<GuestHistory>({
  selectId: (guestHistory) => guestHistory.id
});

const initialGuestState: GuestHistoryState = guestHistoryEntityAdapter.getInitialState();

const reducer = createReducer(
  initialGuestState,
  on(GuestHistoryActions.loadGuestHistoryListSuccess, (state, action) => (
    guestHistoryEntityAdapter.setAll(action.guestHistoryList, state)
  )),
  on(GuestHistoryActions.addGuestHistorySuccess, (state, action) => (
    guestHistoryEntityAdapter.addOne(action.guestHistory, state)
  )),
  on(GuestHistoryActions.updateGuestHistorySuccess, (state, action) => (
    guestHistoryEntityAdapter.upsertOne(action.guestHistory, state)
  )),
  on(
    GuestHistoryActions.loadGuestHistoryListFail,
    GuestHistoryActions.addGuestHistoryFail,
    GuestHistoryActions.updateGuestHistoryFail,
    (state) => (
      { ...state }
    ))
);

export const guestHistoryReducer = (state: GuestHistoryState | undefined, action: Action): GuestHistoryState => reducer(state, action);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = guestHistoryEntityAdapter.getSelectors();
