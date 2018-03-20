/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayphoneService_ } from './payphone.service';

describe('Service: Payphone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayphoneService_]
    });
  });

  it('should ...', inject([PayphoneService_], (service: PayphoneService_) => {
    expect(service).toBeTruthy();
  }));
});
