import { Component, OnInit, Input } from '@angular/core'
import { KeyboardService } from '../keyboard.service.ts'

const BLACK_KEYS = [1, 3, 6, 8, 10]

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
	@Input() key: number
	black: boolean
	down: false

  constructor(private keyboardService: KeyboardService) { }

  noteOn() {
  	this.keyboardService.keyDown(this.key)
  }

  noteOff() {
  	this.keyboardService.keyUp(this.key)	
  }

  ngOnInit() {
  	const relativeKey = this.key % 12
  	this.black = BLACK_KEYS.includes(relativeKey)
  	this.keyboardService.key(this.key).subscribe(down => this.down = down)
  }
}
