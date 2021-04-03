import { NgModule } from '@angular/core';

import { GuestsRoutingModule } from './guests-routing.module';
import { GuestsComponent } from './guests.component';
import { GuestsDetailsContainerComponent } from './containers/guests-details-container/guests-details-container.component';
import { GuestsListContainerComponent } from './containers/guests-list-container/guests-list-container.component';
import { SharedModule } from '@shared/shared.module';
import { GuestCheckoutDialogComponent } from './containers/guest-checkout-dialog/guest-checkout-dialog.component';


@NgModule({
  declarations: [
    GuestsComponent,
    GuestsDetailsContainerComponent,
    GuestsListContainerComponent,
    GuestCheckoutDialogComponent
  ],
  imports: [
    SharedModule,
    GuestsRoutingModule
  ]
})
export class GuestsModule { }
