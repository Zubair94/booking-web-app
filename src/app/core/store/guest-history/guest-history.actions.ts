import { createAction, props } from '@ngrx/store';
import { GuestHistory } from '@typings/guest-history';

const guestHistoryListPayload = props<{ guestHistoryList: Array<GuestHistory> }>();
const guestHistoryPayload = props<{ guestHistory: GuestHistory }>();

/**
 * Load Guest History Actions
 */
export const loadGuestHistoryListInit = createAction(
  '[Guest List Container] LOAD GUEST HISTORY LIST INIT'
);
export const loadGuestHistoryListSuccess = createAction(
  '[Guest List Container] LOAD GUEST HISTORY LIST SUCCESS',
  guestHistoryListPayload
);
export const loadGuestHistoryListFail = createAction(
  '[Guest List Container] LOAD GUEST HISTORY LIST FAIL'
);
/**
 * Add Guest History Actions
 */
export const addGuestHistoryInit = createAction(
  '[Guest List Container] ADD GUEST HISTORY INIT',
  guestHistoryPayload
);
export const addGuestHistorySuccess = createAction(
  '[Guest List Container] ADD GUEST HISTORY SUCCESS',
  guestHistoryPayload
);
export const addGuestHistoryFail = createAction(
  '[Guest List Container] ADD GUEST HISTORY FAIL'
);
/**
 * Update Guest History Actions
 */
export const updateGuestHistoryInit = createAction(
  '[Guest List Container] UPDATE GUEST HISTORY INIT',
  guestHistoryPayload
);
export const updateGuestHistorySuccess = createAction(
  '[Guest List Container] UPDATE GUEST HISTORY SUCCESS',
  guestHistoryPayload
);
export const updateGuestHistoryFail = createAction(
  '[Guest List Container] UPDATE GUEST HISTORY FAIL'
);
