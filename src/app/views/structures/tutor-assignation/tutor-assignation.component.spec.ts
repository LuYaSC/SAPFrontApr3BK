import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAssignationComponent } from './tutor-assignation.component';

describe('TutorAssignationComponent', () => {
  let component: TutorAssignationComponent;
  let fixture: ComponentFixture<TutorAssignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorAssignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorAssignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
