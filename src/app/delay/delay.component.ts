import { Component, OnInit } from '@angular/core'
import { DelayService } from '../delay.service'

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {
	feedback: number
	time: number

	update() {
		this.delayService.feedback = this.feedback
		this.delayService.time = this.time
	}

  constructor(private delayService: DelayService) { }

  ngOnInit() {
  	this.feedback = this.delayService.feedback
  	this.time = this.delayService.time
  }

}
