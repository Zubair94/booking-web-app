import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-guest-select-form',
  templateUrl: './guest-select-form.component.html',
  styleUrls: ['./guest-select-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestSelectFormComponent implements OnInit {

  selectGuest: FormControl;
  constructor(private formBuilder: FormBuilder) {
    this.selectGuest = this.formBuilder.control(null);
  }

  ngOnInit(): void {
  }

}
