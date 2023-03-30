import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCompleteRoomComponent } from './selector-complete-room.component';

describe('SelectorCompleteRoomComponent', () => {
  let component: SelectorCompleteRoomComponent;
  let fixture: ComponentFixture<SelectorCompleteRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorCompleteRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorCompleteRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
