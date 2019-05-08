import { TestBed } from '@angular/core/testing';

import { AdsrService } from './adsr.service';

describe('AdsrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdsrService = TestBed.get(AdsrService);
    expect(service).toBeTruthy();
  });
});
