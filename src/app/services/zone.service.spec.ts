/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZoneService } from './zone.service';

describe('Service: ZoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoneServiceService]
    });
  });

  it('should ...', inject([ZoneServiceService], (service: ZoneServiceService) => {
    expect(service).toBeTruthy();
  }));
});
