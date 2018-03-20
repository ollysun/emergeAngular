/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrepaidServicesPaymentService } from './prepaid-services-payment.service';

describe('Service: PrepaidServicesPayment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrepaidServicesPaymentService]
    });
  });

  it('should ...', inject([PrepaidServicesPaymentService], (service: PrepaidServicesPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
