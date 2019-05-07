import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core'
import { KeyboardService } from '../keyboard.service'
import { Observable } from 'rxjs'

const BLACK_KEYS = [1, 3, 6, 8, 10]

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
	@Input() key: number
	black: boolean
	down: boolean

  constructor(private keyboardService: KeyboardService, private cd: ChangeDetectorRef) { }

  noteOn() {
  	this.keyboardService.keyDown(this.key)
  }

  noteOff() {
  	this.keyboardService.keyUp(this.key)	
  }

  ngOnInit() {
  	const relativeKey = this.key % 12
  	this.black = BLACK_KEYS.includes(relativeKey)
  	this.keyboardService.key(this.key).subscribe((down: boolean) => {
  		this.down = down
  		this.cd.detectChanges()
  	})
  }
}
