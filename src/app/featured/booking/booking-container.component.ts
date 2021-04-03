import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { State } from '@store/core.reducer';
import { Store } from '@ngrx/store';
import { GuestFacadeService } from '@core/services/guest/guest-facade.service';
import { selectAllGuest } from '@store/guest/guest.selectors';
import { Guest } from '@typings/guest';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { RoomService } from '@core/services/room.service';
import { GuestHistoryFacadeService } from '@core/services/guest-history/guest-history-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-container',
  templateUrl: './booking-container.component.html',
  styleUrls: ['./booking-container.component.scss']
})
export class BookingContainerComponent implements OnInit {
  guestList$: Observable<Guest[]>;
  roomsList$: Observable<any[]>;
  addGuestMethod: FormControl = new FormControl('manual');
  selectedGuest: Guest = null;
  bookingFormData: any = null;
  guestFormData: Guest = null;
  disableSubmit = true;
  constructor(private titleService: Title, private store: Store<State>, private guestFacadeService: GuestFacadeService,
              private roomService: RoomService, private guestHistoryFacadeService: GuestHistoryFacadeService,
              private router: Router) {
    this.titleService.setTitle('Booking Form');
  }

  ngOnInit(): void {
    this.roomsList$ = this.roomService.fetchRoomsList();
    this.guestFacadeService.fetchGuestList();
    this.guestList$ = this.store.select(selectAllGuest);
  }

  setSelectedGuest(guest: Guest): void {
    this.selectedGuest = { ...guest };
  }

  setBookingFormData(formData: any): void {
    this.bookingFormData = formData;
    this.disableSubmit = (!this.guestFormData || !this.bookingFormData);
  }

  setGuestFormData(guest: Guest): void {
    this.guestFormData = guest;
    this.disableSubmit = (!this.guestFormData || !this.bookingFormData);
  }

  submitBookingForm(): void {
    console.log(this.guestFormData, this.bookingFormData);
    this.guestHistoryFacadeService.addGuestHistory({
      guestId: this.guestFormData.id,
      checkInDate: this.bookingFormData.checkInDate.toISOString(),
      checkOutDate: null,
      rooms: this.bookingFormData.rooms.roomNo,
      name: this.guestFormData.name
    });
    console.log(this.bookingFormData.rooms);
    this.roomService.updateRooms(this.bookingFormData.rooms.level, this.bookingFormData.rooms).subscribe(() => {
      console.log('updated');
      this.router.navigate(['/guests']);
    });
  }
}
