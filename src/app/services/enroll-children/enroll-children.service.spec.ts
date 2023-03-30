import { TestBed } from '@angular/core/testing';

import { EnrollChildrenService } from './enroll-children.service';

describe('EnrollChildrenService', () => {
  let service: EnrollChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollChildrenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
