import { Component, OnInit, Input } from '@angular/core';

const BLACK_KEYS = [1, 3, 6, 8, 10]

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
	@Input() key: number
	black: boolean

  constructor() { }

  noteOn() {
  	console.log('noteOn', this.key)
  }

  noteOff() {
  	console.log('noteOff', this.key)
  }

  ngOnInit() {
  	const relativeKey = this.key % 12
  	this.black = BLACK_KEYS.includes(relativeKey)
  }
}
