import { TestBed } from '@angular/core/testing';

import { MusickitServiceService } from './musickit-service.service';

describe('MusickitServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusickitServiceService = TestBed.get(MusickitServiceService);
    expect(service).toBeTruthy();
  });
});
