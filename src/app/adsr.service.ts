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

	get node() {
		const gain = this.audioService.context.createGain()
		gain.connect(this.audioService.context.destination)

		return gain
	}

	start(gain: any) {
		gain.gain.setValueAtTime(1e-3, this.audioService.currentTime)
		gain.gain.exponentialRampToValueAtTime(1, this.audioService.currentTime + this.attack)
		gain.gain.exponentialRampToValueAtTime(this.sustain, this.audioService.currentTime + this.attack + this.decay)
	}

	stop(gain: any) {
		return new Promise(resolve => {
			gain.gain.cancelScheduledValues(this.audioService.currentTime)
			gain.gain.exponentialRampToValueAtTime(1e-3, this.audioService.currentTime + this.release)
			setTimeout(() => {
				gain.disconnect(this.audioService.context.destination)
				resolve()
			}, 1000*this.release)
		})
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
  }
}
