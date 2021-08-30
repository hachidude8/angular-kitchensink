import { TestBed } from '@angular/core/testing';

import { MatConfirmationService } from './mat-confirmation.service';

describe('MatConfirmationService', () => {
  let service: MatConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
