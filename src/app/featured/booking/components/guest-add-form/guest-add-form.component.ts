import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guest } from '@typings/guest';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-guest-add-form',
  templateUrl: './guest-add-form.component.html',
  styleUrls: ['./guest-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestAddFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedGuest: Guest;
  @Output() guestFormData = new EventEmitter<any>();
  guestForm: FormGroup;
  private onDestroy = new Subject<any>();
  constructor(private formBuilder: FormBuilder) {
    this.guestForm = this.formBuilder.group({
      id: [],
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
    this.guestForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.onDestroy)
      )
      .subscribe(value => {
        if (this.guestForm.valid) {
          this.guestFormData.emit(value);
        } else {
          this.guestFormData.emit(null);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedGuest && changes.selectedGuest.currentValue) {
      this.guestForm.patchValue({
        ...this.selectedGuest,
        address: null
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  get name(): FormControl {
    return this.guestForm.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.guestForm.get('email') as FormControl;
  }
  get phone(): FormControl {
    return this.guestForm.get('phone') as FormControl;
  }
  get address(): FormControl {
    return this.guestForm.get('address') as FormControl;
  }
}
