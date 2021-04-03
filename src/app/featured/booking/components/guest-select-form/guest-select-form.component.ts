import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Guest } from '@typings/guest';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guest-select-form',
  templateUrl: './guest-select-form.component.html',
  styleUrls: ['./guest-select-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestSelectFormComponent implements OnInit {

  @Input() guestList$: Observable<Guest[]>;
  @Output() selectedGuest = new EventEmitter<Guest>();
  selectGuest: FormControl;
  constructor(private formBuilder: FormBuilder) {
    this.selectGuest = this.formBuilder.control(null);
  }

  ngOnInit(): void {
    this.selectGuest.valueChanges.subscribe(value => {
      this.selectedGuest.emit(value as Guest);
    });
  }

}
