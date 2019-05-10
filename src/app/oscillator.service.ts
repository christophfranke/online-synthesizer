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
	_detune: {
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
		if (value === this._mode) {
			return
		}

		if (this._mode === 'mono') {
			this.downNotes.forEach(({ pitch }) => this.noteOff(pitch))
		}
		if (this._mode === 'poly') {
			Object.keys(this.tones).forEach(pitch => this.noteOff(pitch))
		}

		this._mode = value
	}

	set detuneAmount(value) {
		this._detune.amount = value
		Object.values(this.downNotes).forEach(note => note.updateDetuneAmount(value))
	}

	set detuneFrequency(value) {
		this._detune.frequency = value
		Object.values(this.downNotes).forEach(note => note.updateDetuneFrequency(value))
	}

	get detune() {
		return this._detune
	}

	note(pitch) {
		const osc = this.audioService.context.createOscillator()
		const output = this.output.note(osc)
		const lfo = this.audioService.context.createOscillator()
		lfo.frequency.value = this.detune.frequency
		const lfoGain = this.audioService.context.createGain()
		lfoGain.gain.value = this.detune.amount

		const noteOn = () => {
			osc.frequency.value = frequency(pitch)
			osc.type = <OscillatorType>this.waveform
			osc.start()

			if (this.detune.amount > 0) {			
				lfo.connect(lfoGain)
				lfoGain.connect(osc.detune)
				lfo.start()
			}
			output.noteOn()
		}
		const noteOff = () => {
			output.noteOff(() => {
				osc.stop()
				lfo.stop()
				lfo.disconnect(lfoGain)
				lfoGain.disconnect(osc.detune)
			})
		}
		const changeTo = (newPitch = pitch) => {
			osc.frequency.value = frequency(newPitch)
			return {
				noteOn,
				noteOff,
				changeTo,
				pitch: newPitch
			}
		}
		const updateDetuneAmount = value => {
			lfoGain.gain.value = value
		}
		const updateDetuneFrequency = value => {
			lfo.frequency.value = value
		}


		return {
			noteOn,
			noteOff,
			changeTo,
			updateDetuneFrequency,
			updateDetuneAmount,
			pitch
		}
	}

	noteOn(pitch) {
		if (!this.tones[pitch]) {
			let output
			if (this.mode === 'poly' || this.downNotes.length === 0) {			
				output = this.note(pitch)
				output.noteOn()
			} else {
				output = this.downNotes[this.downNotes.length - 1].changeTo(pitch)
			}
			this.downNotes.push(output)
			this.tones[pitch] = output
		} 
	}

	noteOff(pitch) {
		if (this.tones[pitch]) {
			if (this.mode === 'poly' || this.downNotes.length === 1) {
				this.tones[pitch].noteOff()
			} else {
				if (this.downNotes[this.downNotes.length - 1].pitch === pitch) {
					this.downNotes[this.downNotes.length - 2].changeTo()
				}
			}
			this.downNotes = this.downNotes.filter(note => note.pitch !== pitch)
			delete this.tones[pitch]
		}
	}

  constructor(private audioService: AudioService,
  	private filterService: FilterService) {
  	this.output = this.filterService
  }
}
