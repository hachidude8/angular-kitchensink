import { TestBed } from '@angular/core/testing';
import { CrudSerializerService } from './crud-serializer.service';


describe('CrudSerializerService', () => {
  let service: CrudSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
