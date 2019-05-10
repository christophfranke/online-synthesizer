import { Injectable } from '@angular/core';
import { AudioService } from './audio.service'

@Injectable({
  providedIn: 'root'
})
export class DelayService {
	output: any
	_feedback: number = 0.7
	_time: number = 0.5
	_delay: DelayNode

	get delay() {
		if (!this._delay) {
			this._delay = this.audioService.context.createDelay()
			this._delay.delayTime.value = this._time
			this._delay.connect(this.gain)
			this.gain.connect(this._delay)
			const output = this.output.note(this._delay)
			output.noteOn()
		}

		return this._delay
	}

	get gain() {
		if (!this._gain) {
			this._gain = this.audioService.context.createGain()
			this._gain.gain.value = this.feedback
		}

		return this._gain
	}

	set time(value: number) {
		this._time = value
		this.delay.delayTime.value = this._time
	}

	get time() {
		return this._time
	}

	set feedback(value: number) {
		this._feedback = value
		this.gain.gain.value = this.feedback
	}

	get feedback() {
		return this._feedback
	}

	note(from: AudioNode) {
		const output = this.output.note(from)

		return {
			noteOn: () => {
				from.connect(this.delay)
				output.noteOn()
			},
			noteOff: (fn) => {
				output.noteOff(() => {
					from.disconnect(this.delay)
					fn()
				})
			}
		}
	}

  constructor(private audioService: AudioService) {
  	this.output = this.audioService
  }
}
