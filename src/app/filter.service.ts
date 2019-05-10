import { Injectable } from '@angular/core';
import { AdsrService } from './adsr.service'
import { AudioService } from './audio.service'

@Injectable({
  providedIn: 'root'
})
export class FilterService {
	q: number = 1
	_frequency: number = 2000
	output: any
	_offset: ConstantSourceNode

	get frequency() {
		return this._frequency
	}

	set frequency(value: number) {
		this._frequency = value
		this.offset.offset.setValueAtTime(value, this.audioService.currentTime)
		// this.offset.offset.value = this.frequency
	}

	get offset() {
		if (!this._offset) {
			this._offset = this.audioService.context.createConstantSource()
			this._offset.offset.value = this.frequency
		}

		return this._offset
	}

	note(from: AudioNode) {
		const filter = this.audioService.context.createBiquadFilter()
		filter.Q.value = this.q
		filter.frequency.value = this.frequency
		filter.type = 'lowpass'
		const output = this.output.note(filter)

		return {
			noteOn: () => {
				this.offset.connect(filter.frequency)
				from.connect(filter)
				output.noteOn()
			},
			noteOff: (fn) => {
				output.noteOff(() => {
					from.disconnect(filter)
					this.offset.disconnect(filter.frequency)
					fn()
				})
			}
		}
	}

  constructor(private adsrService: AdsrService,
  	private audioService: AudioService) {
  	this.output = adsrService
  }
}
