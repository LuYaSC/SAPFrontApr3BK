import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleRolesComponent } from './select-multiple-roles.component';

describe('SelectMultipleRolesComponent', () => {
  let component: SelectMultipleRolesComponent;
  let fixture: ComponentFixture<SelectMultipleRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMultipleRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMultipleRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
