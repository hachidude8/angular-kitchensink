import { TestBed } from '@angular/core/testing';

import { JsonserverApiCrudService } from './jsonserver-api.service';

describe('JsonserverApiCrudService', () => {
  let service: JsonserverApiCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonserverApiCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
