import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
	cutoff: number
	resonance: number

  constructor(private filterService: FilterService) { }

  update() {
  	this.filterService.frequency = this.cutoff
  	this.filterService.resonance = this.resonance
  }

  ngOnInit() {
  	this.cutoff = this.filterService.frequency
  	this.resonance = this.filterService.resonance
  }
}
