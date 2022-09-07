import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOperationComponent } from './payment-operation.component';

describe('PaymentOperationComponent', () => {
  let component: PaymentOperationComponent;
  let fixture: ComponentFixture<PaymentOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
