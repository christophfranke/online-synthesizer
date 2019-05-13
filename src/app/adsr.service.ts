import { Injectable } from '@angular/core';
import { AudioService } from './audio.service'
import { DelayService } from './delay.service'

@Injectable({
  providedIn: 'root'
})
export class AdsrService {
	attack: number
	decay: number
	sustain: number
	release: number
	filter: number

	output: any

	_filterAmount: ConstantSourceNode

	get filterAmount() {
		if (!this._filterAmount) {
			this._filterAmount = this.audioService.context.createConstantSource()
			this._filterAmount.offset.value = this.filter
			this._filterAmount.start()
		}

		return this._filterAmount
	}

	note(from: AudioNode, filter: BiquadFilterNode = null) {
		const gain = this.audioService.context.createGain()
		const output = this.output.note(gain)
		const filterGain = this.audioService.context.createGain()

		return {
			noteOn: () => {
				from.connect(gain)
				if (filter) {
					this.filterAmount.connect(filterGain)
					filterGain.connect(filter.frequency)
					filterGain.gain.setValueAtTime(1e-3, this.audioService.currentTime)
					filterGain.gain.exponentialRampToValueAtTime(1, this.audioService.currentTime + this.attack)
					filterGain.gain.exponentialRampToValueAtTime(this.sustain, this.audioService.currentTime + this.attack + this.decay)
				}
				gain.gain.setValueAtTime(1e-3, this.audioService.currentTime)
				gain.gain.exponentialRampToValueAtTime(1, this.audioService.currentTime + this.attack)
				gain.gain.exponentialRampToValueAtTime(this.sustain, this.audioService.currentTime + this.attack + this.decay)
				output.noteOn()				
			},
			noteOff: (fn) => {
				gain.gain.cancelScheduledValues(this.audioService.currentTime)
				gain.gain.exponentialRampToValueAtTime(1e-3, this.audioService.currentTime + this.release)
				filterGain.gain.cancelScheduledValues(this.audioService.currentTime)
				filterGain.gain.exponentialRampToValueAtTime(1e-3, this.audioService.currentTime + this.release)
				setTimeout(() => {
					output.noteOff(() => {
						from.disconnect(gain)
						if (filter) {
							filterGain.disconnect(filter.frequency)
							this.filterAmount.disconnect(filterGain)
						}
						fn()
					})
				}, 1000*this.release)
			}
		}
	}

	update({ attack, decay, sustain, release, filter }: { attack: number, decay: number, sustain: number, release: number, filter: number }) {
		this.attack = attack
		this.decay = decay
		this.sustain = sustain
		this.release = release
		this.filter = filter
		this.filterAmount.offset.value = this.filter
	}

  constructor(private audioService: AudioService,
  	private delayService: DelayService) {
  	this.attack = 0.01
  	this.sustain = 0.5
  	this.decay = 0.07
  	this.release = 1.5
  	this.filter = 0

  	this.output = this.delayService
  }
}
