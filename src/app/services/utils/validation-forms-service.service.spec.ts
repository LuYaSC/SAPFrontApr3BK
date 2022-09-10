import { TestBed } from '@angular/core/testing';

import { ValidationFormsServiceService } from './validation-forms-service.service';

describe('ValidationFormsServiceService', () => {
  let service: ValidationFormsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationFormsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
