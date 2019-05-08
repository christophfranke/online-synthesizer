import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {
	@Input()
	options: string[] = ['off', 'on']
	selected: string
	@Input()
	label: string

  propagateChange = (_: string) => {};
  registerOnChange(fn) {
    this.propagateChange = fn
  }

	writeValue(value: string) {
		this.selected = value
	}

  registerOnTouched() {}

  constructor() { }

  ngOnInit() {
  }

}
