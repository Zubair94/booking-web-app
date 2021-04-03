import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openDialog(component: any, config: MatDialogConfig) {
    return this.dialog.open(component, config);
  }

}
