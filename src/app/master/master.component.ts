import { Component, OnInit } from '@angular/core';
import { AudioService } from '../audio.service'


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
	volume: number = 0.5

	change() {
		this.audioService.volume = this.volume
	}

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

}
