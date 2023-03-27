import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAssignationComponent } from './room-assignation.component';

describe('RoomAssignationComponent', () => {
  let component: RoomAssignationComponent;
  let fixture: ComponentFixture<RoomAssignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAssignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAssignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
