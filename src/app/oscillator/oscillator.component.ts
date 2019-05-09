import { Component, OnInit } from '@angular/core';
import { OscillatorService } from '../oscillator.service'


@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {
	waveform: string
	detuneAmount: number
	detuneFrequency: number
	mode: string

	update() {
		this.oscillatorService.mode = this.mode
		this.oscillatorService.waveform = this.waveform
		this.oscillatorService.detune = {
			amount: this.detuneAmount,
			frequency: this.detuneFrequency
		}
	}

  constructor(private oscillatorService: OscillatorService) { }

  ngOnInit() {
  	this.waveform = this.oscillatorService.waveform
  	this.detuneAmount = this.oscillatorService.detune.amount
  	this.detuneFrequency = this.oscillatorService.detune.frequency
  	this.mode = this.oscillatorService.mode
  }

}
