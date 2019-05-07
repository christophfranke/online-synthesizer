import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
	keys = Array.from(Array(88).keys()).map(i => i + 21)

  constructor() { }

  ngOnInit() {
  }

}
