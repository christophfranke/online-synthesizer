import { Injectable } from '@angular/core';
import { AudioService } from './audio.service'

const frequency = (pitch: number) => 440 * Math.pow(2, (pitch - 69) / 12)

@Injectable({
  providedIn: 'root'
})
export class OscillatorService {
	tones = {}

	noteOn(pitch) {
		if (!this.tones[pitch]) {		
			const osc = this.audioService.context.createOscillator()
			osc.frequency.value = frequency(pitch)

			this.audioService.connect(osc)

			osc.start()

			this.tones[pitch] = osc
		}
	}

	noteOff(pitch) {
		if (this.tones[pitch]) {
			const osc = this.tones[pitch]
			osc.stop()
			this.audioService.disconnect(osc)
			delete this.tones[pitch]
		}
	}

  constructor(private audioService: AudioService) { }
}
