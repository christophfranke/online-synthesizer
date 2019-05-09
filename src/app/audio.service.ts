import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
	_context: AudioContext
	_gain: any

	get context() {
		if (!this._context) {
			this._context = new AudioContext()
		}

		return this._context
	}

	get currentTime() {
		return this.context.currentTime
	}

	note(from: AudioNode) {
		return {
			noteOn: () => {
				from.connect(this.master)
			},
			noteOff: (fn) => {
				from.disconnect(this.master)
				fn()
			}
		}
	}

	get master() {
		if (!this._gain) {
			this._gain = this.context.createGain()
			this._gain.connect(this.context.destination)
		}

		return this._gain
	}

	set volume(value) {
		this.master.gain.value = value
	}

  constructor() { }
}
