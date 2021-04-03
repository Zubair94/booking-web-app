import { createAction, props } from '@ngrx/store';
import { Guest } from '@typings/guest';

const guestPayload = props<{ guestList: Array<Guest> }>();
const addGuestPayload = props<{ guest: Guest }>();

/**
 * Load Guest Actions
 */
export const loadGuestListInit = createAction(
  '[Booking Container] LOAD GUEST LIST INIT'
);
export const loadGuestListSuccess = createAction(
  '[Booking Container] LOAD GUEST LIST SUCCESS',
  guestPayload
);
export const loadGuestListFail = createAction(
  '[Booking Container] LOAD GUEST LIST FAIL'
);

/**
 * Add Guest Actions
 */
export const addGuestInit = createAction(
  '[Booking Container] ADD GUEST INIT',
  addGuestPayload
);
export const addGuestSuccess = createAction(
  '[Booking Container] ADD GUEST SUCCESS',
  addGuestPayload
);
export const addGuestFail = createAction(
  '[Booking Container] ADD GUEST FAIL'
);
