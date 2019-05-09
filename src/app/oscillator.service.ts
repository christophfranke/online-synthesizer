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
	waveform: string = 'sine'
	detune: {
		amount: number,
		frequency: number
	} = {
		amount: 20,
		frequency: 4
	}

	noteOn(pitch) {
		if (!this.tones[pitch]) {		
			const osc = this.audioService.context.createOscillator()
			const output = this.output.note(osc)
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

			this.tones[pitch] = { osc, output }
		}
	}

	noteOff(pitch) {
		if (this.tones[pitch]) {
			const { osc, output } = this.tones[pitch]
			output.noteOff(() => {
				osc.stop()
			})
			delete this.tones[pitch]
		}
	}

  constructor(private audioService: AudioService,
  	private filterService: FilterService) {
  	this.output = this.filterService
  }
}
