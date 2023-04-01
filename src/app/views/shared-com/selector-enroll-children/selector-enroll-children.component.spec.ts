import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorEnrollChildrenComponent } from './selector-enroll-children.component';

describe('SelectorEnrollChildrenComponent', () => {
  let component: SelectorEnrollChildrenComponent;
  let fixture: ComponentFixture<SelectorEnrollChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorEnrollChildrenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorEnrollChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
