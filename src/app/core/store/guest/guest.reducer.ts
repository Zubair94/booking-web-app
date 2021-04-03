import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as GuestActions from './guest.actions';
import { Guest } from '@typings/guest';
import { GuestState } from './guest.state';

export const guestEntityAdapter: EntityAdapter<Guest> = createEntityAdapter<Guest>({
  selectId: (guest) => guest.id
});

const initialGuestState: GuestState = guestEntityAdapter.getInitialState();

const reducer = createReducer(
  initialGuestState,
  on(GuestActions.loadGuestListSuccess, (state, action) => (
    guestEntityAdapter.setAll(action.guestList, state)
  )),
  on(GuestActions.addGuestSuccess, (state, action) => (
    guestEntityAdapter.addOne(action.guest, state)
  )),
  on(
    GuestActions.loadGuestListFail,
    GuestActions.addGuestFail,
    (state) => (
      { ...state }
  ))
);

export const guestReducer = (state: GuestState | undefined, action: Action): GuestState => reducer(state, action);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = guestEntityAdapter.getSelectors();
