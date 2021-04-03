import { Component, OnInit } from '@angular/core';
import { Guest } from '@typings/guest';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GuestFacadeService } from '@core/services/guest/guest-facade.service';
import { State } from '@app/core/store/core.reducer';
import { selectRouterState } from '@store/core.selectors';
import { take } from 'rxjs/operators';
import { selectGuestById } from '@store/guest/guest.selectors';

@Component({
  selector: 'app-guests-details-container',
  templateUrl: './guests-details-container.component.html',
  styleUrls: ['./guests-details-container.component.scss']
})
export class GuestsDetailsContainerComponent implements OnInit {
  guest$: Observable<Guest>;
  private guestId: number = null;
  constructor(private store: Store<State>, private guestFacadeService: GuestFacadeService) { }

  ngOnInit(): void {
    this.guestFacadeService.fetchGuestList();
    this.store.select(selectRouterState).pipe(take(1)).subscribe(routerState => {
      this.guestId = routerState.params.id;
    });
    if (this.guestId) {
      this.guest$ = this.store.select(selectGuestById, { id: this.guestId });
    }
  }

}
