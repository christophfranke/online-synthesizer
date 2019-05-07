import { Component, HostListener } from '@angular/core';

const NOTES = {
	'a': 60,
	'w': 61,
	's': 62,
	'e': 63,
	'd': 64,
	'f': 65,
	't': 66,
	'g': 67,
	'z': 68,
	'h': 69,
	'u': 70,
	'j': 71,
	'k': 72,
	'o': 73,
	'l': 74,
	'p': 75
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'synth';

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
  	const key = event.key.toLowerCase()
  	if (NOTES[key]) {
  		console.log('down', key)
  	}
  }
}
