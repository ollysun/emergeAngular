/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpecialDayService } from './special-day.service';

describe('Service: SpecialDay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialDayService]
    });
  });

  it('should ...', inject([SpecialDayService], (service: SpecialDayService) => {
    expect(service).toBeTruthy();
  }));
});
