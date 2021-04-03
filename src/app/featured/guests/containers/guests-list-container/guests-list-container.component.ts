import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GuestHistory } from '@typings/guest-history';
import { GuestFacadeService } from '@core/services/guest/guest-facade.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@store/core.reducer';
import { selectAllGuestHistoryFiltered } from '@store/guest-history/guest-history.selectors';
import { GuestHistoryFacadeService } from '@core/services/guest-history/guest-history-facade.service';
import { DialogService } from '@app/core/services/dialog.service';
import { GuestCheckoutDialogComponent } from '@featured/guests/containers/guest-checkout-dialog/guest-checkout-dialog.component';

@Component({
  selector: 'app-guests-list-container',
  templateUrl: './guests-list-container.component.html',
  styleUrls: ['./guests-list-container.component.scss']
})
export class GuestsListContainerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'checkInDate', 'rooms', 'action'];
  dataSource: MatTableDataSource<GuestHistory>;
  guestHistoryList$: Observable<GuestHistory[]>;
  constructor(private guestFacadeService: GuestFacadeService, private store: Store<State>,
              private guestHistoryFacadeService: GuestHistoryFacadeService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.guestFacadeService.fetchGuestList();
    this.guestHistoryFacadeService.fetchGuestHistoryList();
    this.guestHistoryList$ = this.store.select(selectAllGuestHistoryFiltered);
    this.guestHistoryList$.subscribe(list => {
      this.dataSource = new MatTableDataSource<GuestHistory>(list);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  handleGuestCheckOut(history: GuestHistory): void {
    this.dialogService.openDialog(GuestCheckoutDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: '30vw',
      maxHeight: '25vh',
      hasBackdrop: true,
      closeOnNavigation: true,
      data: {
        history
      }
    });
  }

}
