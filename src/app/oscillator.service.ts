import { Injectable } from '@angular/core';
import { AudioService } from './audio.service'
import { FilterService } from './filter.service'

const frequency = (pitch: number) => 440 * Math.pow(2, (pitch - 69) / 12)

@Injectable({
  providedIn: 'root'
})
export class OscillatorService {
	output: any
	tones = {}
	waveform: string = 'sawtooth'
	_mode: string = 'poly'
	detune: {
		amount: number,
		frequency: number
	} = {
		amount: 20,
		frequency: 4
	}
	downNotes = []

	get mode() {
		return this._mode
	}

	set mode(value) {
		if (this._mode === 'mono') {
			this.downNotes.forEach(({ pitch }) => this.noteOff(pitch))
		}
		if (this._mode === 'poly') {
			Object.keys(this.tones).forEach(pitch => this.noteOff(pitch))
		}

		this._mode = value
	}

	noteOn(pitch) {
		if (!this.tones[pitch]) {
			let osc, output
			if (this.mode === 'poly' || this.downNotes.length === 0) {			
				osc = this.audioService.context.createOscillator()
				output = this.output.note(osc)
				osc.frequency.value = frequency(pitch)
				osc.type = <OscillatorType>this.waveform
				osc.start()

				if (this.detune.amount > 0) {			
					const lfo = this.audioService.context.createOscillator()
					lfo.frequency.value = this.detune.frequency
					const lfoGain = this.audioService.context.createGain()
					lfoGain.gain.value = this.detune.amount
					lfo.connect(lfoGain)
					lfoGain.connect(osc.detune)
					lfo.start()
				}
				output.noteOn()

				this.downNotes.push({ osc, output, pitch })
			} else {
				osc = this.downNotes[0].osc
				output = this.downNotes[0].output
				osc.frequency.value = frequency(pitch)
				this.downNotes.push({ osc, output, pitch })
			}
			this.tones[pitch] = { osc, output }
		} 
	}

	noteOff(pitch) {
		if (this.tones[pitch]) {
			if (this.mode === 'poly' || this.downNotes.length === 1) {			
				const { osc, output } = this.tones[pitch]
				output.noteOff(() => {
					osc.stop()
				})
				this.downNotes = []
			} else {
				this.downNotes = this.downNotes.filter(n => n.pitch !== pitch)
				this.downNotes[0].osc.frequency.value = frequency(this.downNotes[this.downNotes.length - 1].pitch)
			}
			delete this.tones[pitch]
		}
	}

  constructor(private audioService: AudioService,
  	private filterService: FilterService) {
  	this.output = this.filterService
  }
}
