import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
	_context: AudioContext

	get context() {
		if (!this._context) {
			this._context = new AudioContext()
		}

		return this._context
	}

	connect(node: any) {
		node.connect(this.context.destination)
	}

	disconnect(node: any) {
		node.disconnect(this.context.destination)
	}

  constructor() { }
}
