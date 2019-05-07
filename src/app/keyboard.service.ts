import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { OscillatorService } from './oscillator.service'

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
	keys = []

	initKey(key: number) {
		this.keys[key] = {
			down: false,
			observers: []
		}
	}

	key(key: number) {
		return new Observable<boolean>(observer => {
			if (!this.keys[key]) {
				this.initKey(key)
			}

			this.keys[key].observers.push(observer)
			observer.next(false)
		})
	}

	keyDown(key: number) {
		if (!this.keys[key]) {
			this.initKey(key)
		}

		this.keys[key].down = true
		this.keys[key].observers.forEach(obs => obs.next(true))
		this.oscillatorService.noteOn(key)
	}

	keyUp(key: number) {
		if (!this.keys[key]) {
			this.initKey(key)
		}

		this.keys[key].down = false
		this.keys[key].observers.forEach(obs => obs.next(false))
		this.oscillatorService.noteOff(key)
	}

  constructor(private oscillatorService: OscillatorService) { }
}
