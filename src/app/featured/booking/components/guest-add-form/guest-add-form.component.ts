import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-guest-add-form',
  templateUrl: './guest-add-form.component.html',
  styleUrls: ['./guest-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestAddFormComponent implements OnInit, OnDestroy {

  @Output() bookingFormData = new EventEmitter<any>();
  bookingForm: FormGroup;
  private onDestroy = new Subject<any>();
  constructor(private formBuilder: FormBuilder) {
    this.bookingForm = this.formBuilder.group({
      name: [null, Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(50)
      ])],
      phone: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      address: [null, Validators.maxLength(100)]
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

  get name(): FormControl {
    return this.bookingForm.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.bookingForm.get('email') as FormControl;
  }
  get phone(): FormControl {
    return this.bookingForm.get('phone') as FormControl;
  }
  get address(): FormControl {
    return this.bookingForm.get('address') as FormControl;
  }
}
