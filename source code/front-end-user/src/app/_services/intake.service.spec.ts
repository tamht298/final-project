import { TestBed } from '@angular/core/testing';

import { IntakeService } from './intake.service';

describe('IntakeService', () => {
  let service: IntakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
