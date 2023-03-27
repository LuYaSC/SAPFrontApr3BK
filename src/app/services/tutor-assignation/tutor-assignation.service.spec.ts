import { TestBed } from '@angular/core/testing';

import { TutorAssignationService } from './tutor-assignation.service';

describe('TutorAssignationService', () => {
  let service: TutorAssignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorAssignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
