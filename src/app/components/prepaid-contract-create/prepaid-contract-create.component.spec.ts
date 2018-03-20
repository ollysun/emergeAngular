/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrepaidContractCreateComponent } from './prepaid-contract-create.component';

describe('PrepaidContractCreateComponent', () => {
  let component: PrepaidContractCreateComponent;
  let fixture: ComponentFixture<PrepaidContractCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrepaidContractCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidContractCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
