import { TestBed } from '@angular/core/testing';

import { RoomAssignationService } from './room-assignation.service';

describe('RoomAssignationService', () => {
  let service: RoomAssignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomAssignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
