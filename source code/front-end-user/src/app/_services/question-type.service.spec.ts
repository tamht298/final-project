import { TestBed } from '@angular/core/testing';

import { QuestionTypeService } from './question-type.service';

describe('QuestionTypeService', () => {
  let service: QuestionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
