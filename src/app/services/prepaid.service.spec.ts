/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrepaidService } from './prepaid.service';

describe('Service: Prepaid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrepaidService]
    });
  });

  it('should ...', inject([PrepaidService], (service: PrepaidService) => {
    expect(service).toBeTruthy();
  }));
});
