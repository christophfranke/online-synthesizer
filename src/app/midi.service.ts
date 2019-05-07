import { Injectable } from '@angular/core';
import { KeyboardService } from './keyboard.service'

const NOTE_ON = 144
const NOTE_OFF = 128


@Injectable({
  providedIn: 'root'
})
export class MidiService {

	connect(input: any) {
		input.onmidimessage = msg => {
 			if (msg.data[0] === NOTE_ON) {
 				this.keyboardService.keyDown(msg.data[1])
 			}

 			if (msg.data[0] === NOTE_OFF) {
 				this.keyboardService.keyUp(msg.data[1])
 			}
   	}
	}

  constructor(private keyboardService: KeyboardService) {
  	if (navigator['requestMIDIAccess']) {
			navigator['requestMIDIAccess']()
				.then(access => {
					access.inputs.forEach(input => this.connect(input))
					access.onstatechange = e => {
			      // Print information about the (dis)connected MIDI controller
						console.log(e.port.name, e.port.manufacturer, e.port.state)
				  }
				})	
  	}
  }
}
