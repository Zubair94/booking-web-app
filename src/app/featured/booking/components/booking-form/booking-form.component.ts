import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent implements OnInit, OnDestroy {

  @Output() bookingFormData = new EventEmitter<any>();
  bookingForm: FormGroup;
  private onDestroy = new Subject<any>();
  constructor(private formBuilder: FormBuilder) {
    this.bookingForm = this.formBuilder.group({
      checkInDate: [null, Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(50)
      ])],
      rooms: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookingForm.valueChanges
    .pipe(
      debounceTime(500),
      takeUntil(this.onDestroy)
    )
    .subscribe(value => {
      if (this.bookingForm.valid) {
        this.bookingFormData.emit(value);
      } else {
        this.bookingFormData.emit(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  get checkInDate(): FormControl {
    return this.bookingForm.get('checkInDate') as FormControl;
  }
  get rooms(): FormControl {
    return this.bookingForm.get('rooms') as FormControl;
  }
}
