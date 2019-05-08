import { Component, OnInit } from '@angular/core';
import { OscillatorService } from '../oscillator.service'


@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {
	waveform: string

	update() {
		this.oscillatorService.waveform = this.waveform
	}

  constructor(private oscillatorService: OscillatorService) { }

  ngOnInit() {
  	this.waveform = this.oscillatorService.waveform
  }

}
