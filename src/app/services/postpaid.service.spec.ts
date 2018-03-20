/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostpaidService } from './postpaid.service';

describe('Service: Postpaid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostpaidService]
    });
  });

  it('should ...', inject([PostpaidService], (service: PostpaidService) => {
    expect(service).toBeTruthy();
  }));
});
