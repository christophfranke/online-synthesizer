import { Component, OnInit } from '@angular/core';
import { AdsrService } from '../adsr.service'

@Component({
  selector: 'app-adsr',
  templateUrl: './adsr.component.html',
  styleUrls: ['./adsr.component.scss']
})
export class AdsrComponent implements OnInit {
	attack: number
	decay: number
	sustain: number
	release: number

  constructor(private adsrService: AdsrService) { }

  updateService() {
  	this.adsrService.update({
  		attack: this.attack,
  		decay: this.decay,
  		sustain: this.sustain,
  		release: this.release
  	})
  }

  ngOnInit() {
  	this.attack = this.adsrService.attack
  	this.decay = this.adsrService.decay
  	this.sustain = this.adsrService.sustain
  	this.release = this.adsrService.release
  }

}
