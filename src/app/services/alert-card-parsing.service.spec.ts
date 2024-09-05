import { TestBed } from '@angular/core/testing';

import { AlertCardParsingService } from './alert-card-parsing.service';

describe('AlertCardParsingService', () => {
  let service: AlertCardParsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertCardParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
