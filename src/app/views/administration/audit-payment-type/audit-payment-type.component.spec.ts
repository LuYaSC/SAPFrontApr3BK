import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPaymentTypeComponent } from './audit-payment-type.component';

describe('AuditPaymentTypeComponent', () => {
  let component: AuditPaymentTypeComponent;
  let fixture: ComponentFixture<AuditPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditPaymentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
