/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrefixServiceService } from './prefix.service';

describe('Service: PrefixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrefixServiceService]
    });
  });

  it('should ...', inject([PrefixServiceService], (service: PrefixServiceService) => {
    expect(service).toBeTruthy();
  }));
});
