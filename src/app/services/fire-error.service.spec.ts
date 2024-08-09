import { TestBed } from '@angular/core/testing';

import { FireErrorService } from './fire-error.service';

describe('FireErrorService', () => {
  let service: FireErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
