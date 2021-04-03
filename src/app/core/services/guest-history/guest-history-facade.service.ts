import { Injectable } from '@angular/core';
import { State } from '@store/core.reducer';
import { Store } from '@ngrx/store';

import * as GuestActions from '@store/guest-history/guest-history.actions';
import { GuestHistory } from '@typings/guest-history';

@Injectable({
  providedIn: 'root'
})
export class GuestHistoryFacadeService {
  constructor(private store: Store<State>) {}

  fetchGuestHistoryList(): void {
    this.store.dispatch(GuestActions.loadGuestHistoryListInit());
  }

  addGuestHistory(guestHistory: GuestHistory): void {
    this.store.dispatch(GuestActions.addGuestHistoryInit({ guestHistory }));
  }

  updateGuestHistory(guestHistory: GuestHistory): void {
    this.store.dispatch(GuestActions.updateGuestHistoryInit({ guestHistory }));
  }
}
