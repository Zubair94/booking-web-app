import { Injectable, Injector } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as GuestActions from './guest.actions';
import { GuestService } from '@core/services/guest/guest.service';
import { EffectsHelper } from '@store/utils/effects-helper';
import { of } from 'rxjs';

@Injectable()
export class GuestEffects extends EffectsHelper {

  loadGuestListInitEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.loadGuestListInit),
      mergeMap(() => this.guestService.fetchGuestList()
        .pipe(
          map(guestList => {
            const guestPayload = localStorage.getItem('guestList');
            const list = guestPayload ? JSON.parse(guestPayload) : [];
            const transformedGuestList = guestList.map((guest: any) =>
              ({ ...guest, address: guest.address.suite + ', ' +
                  guest.address.street + ', ' + guest.address.city + ', ' + guest.address.zipcode }));
            return GuestActions.loadGuestListSuccess({ guestList: [...transformedGuestList, ...list] });
          }),
          this.handleError(GuestActions.loadGuestListFail())
        )
      )
    )
  );

  addGuestListInitEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.addGuestInit),
      mergeMap(({ guest }) => {
        const guestPayload = localStorage.getItem('guestList');
        const guestList = guestPayload ? JSON.parse(guestPayload) : [];
        const newGuest = { ...guest, id: guestList.length === 0 ? 10 + 1 : 10 + guestList.length + 1 };
        const newList = [...guestList, newGuest];
        console.log(newList);
        return of(newGuest).pipe(
          map(g => {
            localStorage.setItem('guestList', JSON.stringify(newList));
            return GuestActions.addGuestSuccess({ guest: g });
          }),
          this.handleError(GuestActions.addGuestFail())
        );
      })
    )
  );

  constructor(private actions$: Actions, private guestService: GuestService, private injector: Injector) {
    super(injector);
  }
}
