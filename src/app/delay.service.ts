import { Injectable } from '@angular/core';
import { AudioService } from './audio.service'

@Injectable({
  providedIn: 'root'
})
export class DelayService {
	output: any
	feedback: number = 0.1

	note(from: AudioNode) {
		const output = this.output.note(from)

		return {
			noteOn: () => {
				output.noteOn()
			},
			noteOff: (fn) => {
				output.noteOff(fn)
			}
		}
	}

  constructor(private audioService: AudioService) {
  	this.output = this.audioService
  }
}
