import { TestBed } from '@angular/core/testing';
import { RestResourcesService } from './rest-resources.service';


describe('RestResourcesService', () => {
  let service: RestResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
