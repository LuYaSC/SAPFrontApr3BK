import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBusinessComponent } from './type-business.component';

describe('TypeBusinessComponent', () => {
  let component: TypeBusinessComponent;
  let fixture: ComponentFixture<TypeBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
