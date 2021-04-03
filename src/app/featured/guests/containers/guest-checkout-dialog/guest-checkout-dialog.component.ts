import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { GuestHistoryFacadeService } from '@core/services/guest-history/guest-history-facade.service';

@Component({
  selector: 'app-guest-checkout-dialog',
  templateUrl: './guest-checkout-dialog.component.html',
  styleUrls: ['./guest-checkout-dialog.component.scss']
})
export class GuestCheckoutDialogComponent implements OnInit {

  checkOutDate: FormControl = new FormControl('');
  constructor(private dialogRef: MatDialogRef<DialogService>, private guestHistoryFacade: GuestHistoryFacadeService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  checkOut(): void {
    this.guestHistoryFacade.updateGuestHistory({ ...this.data.history, checkOutDate: this.checkOutDate.value.toISOString() });
    this.close();
  }

}
