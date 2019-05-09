import { Injectable } from '@angular/core';
import { AudioService } from './audio.service'

@Injectable({
  providedIn: 'root'
})
export class AdsrService {
	attack: number
	decay: number
	sustain: number
	release: number

	output: any

	note(from: AudioNode) {
		const gain = this.audioService.context.createGain()
		const output = this.output.note(gain)

		return {
			noteOn: () => {
				from.connect(gain)
				gain.gain.setValueAtTime(1e-3, this.audioService.currentTime)
				gain.gain.exponentialRampToValueAtTime(1, this.audioService.currentTime + this.attack)
				gain.gain.exponentialRampToValueAtTime(this.sustain, this.audioService.currentTime + this.attack + this.decay)
				output.noteOn()
			},
			noteOff: (fn) => {
				gain.gain.cancelScheduledValues(this.audioService.currentTime)
				gain.gain.exponentialRampToValueAtTime(1e-3, this.audioService.currentTime + this.release)
				setTimeout(() => {
					output.noteOff(() => {
						from.disconnect(gain)
						fn()
					})
				}, 1000*this.release)
			}
		}
	}

	update({ attack, decay, sustain, release }: { attack: number, decay: number, sustain: number, release: number }) {
		this.attack = attack
		this.decay = decay
		this.sustain = sustain
		this.release = release
	}

  constructor(private audioService: AudioService) {
  	this.attack = 0.01
  	this.sustain = 0.5
  	this.decay = 0.07
  	this.release = 1.5

  	this.output = this.audioService
  }
}
