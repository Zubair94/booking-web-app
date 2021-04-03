import { NgModule } from '@angular/core';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingContainerComponent } from './booking-container.component';
import { SharedModule } from '@shared/shared.module';
import { GuestSelectFormComponent } from './components/guest-select-form/guest-select-form.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { GuestAddFormComponent } from './components/guest-add-form/guest-add-form.component';


@NgModule({
  declarations: [
    BookingContainerComponent,
    GuestSelectFormComponent,
    BookingFormComponent,
    GuestAddFormComponent
  ],
  imports: [
    SharedModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
