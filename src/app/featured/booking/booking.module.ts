import { NgModule } from '@angular/core';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    SharedModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
