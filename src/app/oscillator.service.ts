import { Injectable } from '@angular/core';
import { AudioService } from './audio.service'
import { AdsrService } from './adsr.service'

const frequency = (pitch: number) => 440 * Math.pow(2, (pitch - 69) / 12)

@Injectable({
  providedIn: 'root'
})
export class OscillatorService {
	output: any
	tones = {}

	noteOn(pitch) {
		if (!this.tones[pitch]) {		
			const osc = this.audioService.context.createOscillator()
			const out = this.output.node
			osc.frequency.value = frequency(pitch)
			osc.type = "sawtooth"
			osc.connect(out)
			osc.start()
			this.output.start(out)

			this.tones[pitch] = { osc, out }
		}
	}

	noteOff(pitch) {
		if (this.tones[pitch]) {
			const { osc, out } = this.tones[pitch]
			this.output.stop(out).then(() => {			
				osc.stop()
				osc.disconnect(out)
			})

			delete this.tones[pitch]
		}
	}

  constructor(private audioService: AudioService,
  	private adsrService: AdsrService) {
  	this.output = this.adsrService
  }
}
