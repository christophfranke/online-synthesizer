import { Component, OnInit, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-fader',
  templateUrl: './fader.component.html',
  styleUrls: ['./fader.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FaderComponent),
      multi: true
    }
  ]
})
export class FaderComponent implements OnInit, ControlValueAccessor {
	value: number

	@Input()
	min: number = 0
	@Input()
	max: number = 1
	@Input()
	slope: number = 5
	step: number = (this.max - this.min) / 1000
	
	@Input()
	label: string

	applySlope(value: number) {
		const relativeValue = (this.value - this.min) / (this.max - this.min)
		const slopedValue = Math.pow(relativeValue, this.slope)
		return Number(this.min) + slopedValue * (this.max - this.min)
	}

	inverseSlope(value: number) {
		const relativeValue = (value - this.min) / (this.max - this.min)
		const slopedValue = Math.pow(relativeValue, 1 / this.slope)
		return Number(this.min) + slopedValue * (this.max - this.min)
	}

  propagateChange = (_: any) => {};
  registerOnChange(fn) {
    this.propagateChange = value => fn(this.applySlope(value))
  }

	writeValue(value: any) {
		this.value = this.inverseSlope(value)
	}

  registerOnTouched() {}


  constructor() { }

  ngOnInit() {
  }

}
