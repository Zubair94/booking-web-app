import { Injectable, Injector } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as GuestHistoryActions from './guest-history.actions';
import { EffectsHelper } from '@store/utils/effects-helper';
import { of } from 'rxjs';

@Injectable()
export class GuestHistoryEffects extends EffectsHelper {

  loadGuestHistoryListInitEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestHistoryActions.loadGuestHistoryListInit),
      mergeMap(() => {
        const guestHistoryList = localStorage.getItem('guestHistoryList');
        console.log(guestHistoryList);
        return of(guestHistoryList ? JSON.parse(guestHistoryList) : []).pipe(
          map(list => {
            console.log(list);
            return GuestHistoryActions.loadGuestHistoryListSuccess({ guestHistoryList: list });
          }),
          this.handleError(GuestHistoryActions.loadGuestHistoryListFail())
        );
      })
    )
  );

  addGuestHistoryListInitEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestHistoryActions.addGuestHistoryInit),
      mergeMap(({ guestHistory }) => {
        const guestHistoryPayload = localStorage.getItem('guestHistoryList');
        const guestHistoryList = guestHistoryPayload ? JSON.parse(guestHistoryPayload) : [];
        const newGuestHistory = { ...guestHistory, id: guestHistoryList.length + 1 };
        const newList = [...guestHistoryList, newGuestHistory];
        console.log(newList);
        return of(newGuestHistory).pipe(
          map(h => {
            localStorage.setItem('guestHistoryList', JSON.stringify(newList));
            return GuestHistoryActions.addGuestHistorySuccess({ guestHistory: h });
          }),
          this.handleError(GuestHistoryActions.addGuestHistoryFail())
        );
      })
    )
  );

  updateGuestHistoryListInitEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestHistoryActions.updateGuestHistoryInit),
      mergeMap(({ guestHistory }) => {
        const guestHistoryPayload = localStorage.getItem('guestHistoryList');
        const guestHistoryList = guestHistoryPayload ? JSON.parse(guestHistoryPayload) : [];
        const newGuestHistory = { ...guestHistory };
        const newList = guestHistoryList.map(history => {
          if (history.id === guestHistory.id) {
            history.checkOutDate = guestHistory.checkOutDate;
          }
          return history;
        });
        console.log(newList);
        return of(newGuestHistory).pipe(
          map(h => {
            localStorage.setItem('guestHistoryList', JSON.stringify(newList));
            return GuestHistoryActions.updateGuestHistorySuccess({ guestHistory: h });
          }),
          this.handleError(GuestHistoryActions.updateGuestHistoryFail())
        );
      })
    )
  );

  constructor(private actions$: Actions, private injector: Injector) {
    super(injector);
  }
}
