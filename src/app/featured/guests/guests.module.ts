import { NgModule } from '@angular/core';

import { GuestsRoutingModule } from './guests-routing.module';
import { GuestsComponent } from './guests.component';
import { GuestsDetailsContainerComponent } from './containers/guests-details-container/guests-details-container.component';
import { GuestsListContainerComponent } from './containers/guests-list-container/guests-list-container.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    GuestsComponent,
    GuestsDetailsContainerComponent,
    GuestsListContainerComponent
  ],
  imports: [
    SharedModule,
    GuestsRoutingModule
  ]
})
export class GuestsModule { }
