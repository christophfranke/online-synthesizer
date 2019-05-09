import { Injectable } from '@angular/core';
import { AdsrService } from './adsr.service'
import { AudioService } from './audio.service'

@Injectable({
  providedIn: 'root'
})
export class FilterService {
	q: number = 1
	frequency: number = 2000

	output: any

	note(from: AudioNode) {
		const filter = this.audioService.context.createBiquadFilter()
		filter.Q.value = this.q
		filter.frequency.value = this.frequency
		filter.type = 'lowpass'
		const output = this.output.note(filter)

		return {
			noteOn: () => {
				from.connect(filter)
				output.noteOn()
			},
			noteOff: (fn) => {
				output.noteOff(() => {
					from.disconnect(filter)
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
