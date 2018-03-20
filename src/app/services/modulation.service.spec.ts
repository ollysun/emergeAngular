/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModulationService } from './modulation.service';

describe('Service: Modulation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModulationService]
    });
  });

  it('should ...', inject([ModulationService], (service: ModulationService) => {
    expect(service).toBeTruthy();
  }));
});
