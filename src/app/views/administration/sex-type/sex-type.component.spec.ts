import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexTypeComponent } from './sex-type.component';

describe('SexTypeComponent', () => {
  let component: SexTypeComponent;
  let fixture: ComponentFixture<SexTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SexTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
