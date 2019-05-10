import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const clamp = a => Math.max(0, Math.min(a, 1))

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
	type: string = 'time'
	slope: number
	step: number = (this.max - this.min) / 1000

	@Output()
  change: EventEmitter<number> = new EventEmitter<number>()
	
	@Input()
	label: string

	get transform() {
		const relativeValue = (this.value - this.min) / (this.max - this.min)
		const deg = Math.round(270*relativeValue - 140)

		return `rotate3d(0, 0, 1, ${deg}deg)`
	}

	mousedown(e) {
		const baseY = e.clientY
		const relativeBaseValue = this.relativeValue
		const range = 100
		const move = e => {
			const relativeY = baseY - e.clientY
			this.relativeValue = clamp(relativeBaseValue + relativeY / range)
		}

		const up = () => {
			window.removeEventListener('mousemove', move)
			window.removeEventListener('mouseup', up)
		}

		window.addEventListener('mousemove', move)
		window.addEventListener('mouseup', up)
	}

	set relativeValue(relative: number) {
		this.value = Number(this.min) + relative * (this.max - this.min)
		this.propagateChange(this.value)
		this.change.emit(this.value)
	}

	get relativeValue() {
		return (this.value - this.min) / (this.max - this.min)
	}

	get roundedValue() {
		return Math.round(100*this.value) / 100
	}

	applySlope(value: number) {
		const relativeValue = (value - this.min) / (this.max - this.min)
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


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.slope = 1
  	if (this.type === 'type') {
  		this.slope = 5
  	}
  	if (this.type === 'gain') {
  		this.slope = 1.5
  	}
  }

}
