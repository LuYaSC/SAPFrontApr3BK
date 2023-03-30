import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledChildrenComponent } from './enrolled-children.component';

describe('EnrolledChildrenComponent', () => {
  let component: EnrolledChildrenComponent;
  let fixture: ComponentFixture<EnrolledChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledChildrenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
