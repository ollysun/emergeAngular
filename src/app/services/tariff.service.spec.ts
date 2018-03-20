/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TariffService } from './tariff.service';

describe('Service: Tariff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TariffService]
    });
  });

  it('should ...', inject([TariffService], (service: TariffService) => {
    expect(service).toBeTruthy();
  }));
});
