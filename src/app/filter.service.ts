import { Injectable } from '@angular/core';
import { AdsrService } from './adsr.service'
import { AudioService } from './audio.service'

@Injectable({
  providedIn: 'root'
})
export class FilterService {
	_resonance: number = 1
	_frequency: number = 2000
	output: any
	_frequencyControl: ConstantSourceNode
	_resonanceControl: ConstantSourceNode

	get frequency() {
		return this._frequency
	}

	set frequency(value: number) {
		this._frequency = value
		this.frequencyControl.offset.setValueAtTime(value, this.audioService.currentTime)
		this.frequencyControl.offset.value = this.frequency
	}

	get frequencyControl() {
		if (!this._frequencyControl) {
			this._frequencyControl = this.audioService.context.createConstantSource()
			this._frequencyControl.offset.value = this.frequency
			this._frequencyControl.start()
		}

		return this._frequencyControl
	}

	get resonanceControl() {
		if (!this._resonanceControl) {
			this._resonanceControl = this.audioService.context.createConstantSource()
			this._resonanceControl.offset.value = this.resonance
			this._resonanceControl.start()
		}

		return this._resonanceControl
	}

	get resonance() {
		return this._resonance
	}

	set resonance(value: number) {
		this._resonance = value
		this.resonanceControl.offset.value = this.resonance
	}

	note(from: AudioNode) {
		const filter = this.audioService.context.createBiquadFilter()
		filter.Q.value = 0
		filter.frequency.value = 0
		filter.type = 'lowpass'
		const output = this.output.note(filter)

		return {
			noteOn: () => {
				this.frequencyControl.connect(filter.frequency)
				this.resonanceControl.connect(filter.Q)
				from.connect(filter)
				output.noteOn()
			},
			noteOff: (fn) => {
				output.noteOff(() => {
					from.disconnect(filter)
					this.frequencyControl.disconnect(filter.frequency)
					this.resonanceControl.disconnect(filter.Q)
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
