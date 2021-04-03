import { Injectable } from '@angular/core';
import { State } from '@store/core.reducer';
import { Store } from '@ngrx/store';

import * as GuestActions from '@store/guest/guest.actions';
import { Guest } from '@typings/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestFacadeService {
  constructor(private store: Store<State>) {}

  fetchGuestList(): void {
    this.store.dispatch(GuestActions.loadGuestListInit());
  }

  addGuest(guest: Guest): void {
    this.store.dispatch(GuestActions.addGuestInit({ guest }));
  }
}
