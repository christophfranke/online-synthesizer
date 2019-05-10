import { Component, OnInit } from '@angular/core'
import { DelayService } from '../delay.service'

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {
	feedback: number

	update() {
		this.delayService.feedback = this.feedback
	}

  constructor(private delayService: DelayService) { }

  ngOnInit() {
  	this.feedback = this.delayService.feedback
  }

}
