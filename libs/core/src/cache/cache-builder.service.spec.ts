import { TestBed } from '@angular/core/testing';

import { CacheBuilderService } from './cache-builder.service';

describe('CacheBuilderService', () => {
  let service: CacheBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
