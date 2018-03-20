/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrepaidContractSupplementCreateComponent } from './prepaid-contract-supplement-create.component';

describe('PrepaidContractSupplementCreateComponent', () => {
  let component: PrepaidContractSupplementCreateComponent;
  let fixture: ComponentFixture<PrepaidContractSupplementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaidContractSupplementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidContractSupplementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
