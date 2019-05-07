import { TestBed } from '@angular/core/testing';

import { OscillatorService } from './oscillator.service';

describe('OscillatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OscillatorService = TestBed.get(OscillatorService);
    expect(service).toBeTruthy();
  });
});
