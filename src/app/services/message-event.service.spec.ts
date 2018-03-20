/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageEvent } from './message-event.service';

describe('Service: MessageEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageEvent]
    });
  });

  it('should ...', inject([MessageEvent], (service: MessageEvent) => {
    expect(service).toBeTruthy();
  }));
});
