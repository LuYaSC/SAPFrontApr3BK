import { TestBed } from '@angular/core/testing';

import { TypeBusinessService } from './type-business.service';

describe('CityService', () => {
  let service: TypeBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
