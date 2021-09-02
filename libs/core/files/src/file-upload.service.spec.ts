import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FileUploadService } from './file-upload.service';


describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('Should convert the payload to FormData', () => {
  //   const source = { text: 'Whatever' };
  //   const payload = service.convertPayload(source);
  //   expect(payload instanceof FormData).toBeTruthy();
  // });

  // it('Should convert the payload and contain the same values', () => {
  //   const file = new File([''], 'test-file.txt', { type: 'text/html' });
  //   const source = {
  //     text: 'Whatever',
  //     file,
  //     luckyNumber: 8,
  //     listValues: ['simple', 'string', 'values', 'list'],
  //     listMixValues: ['simple', 'mixed', 42, 'values', true],
  //     nestedValues: {
  //       hello: 'world',
  //       answer: 42,
  //       nested: {
  //         again: 'and again'
  //       }
  //     }
  //   };
  //   const payload = service.convertPayload(source);
  //   expect(payload.get('text')).toStrictEqual('Whatever');
  //   expect(payload.get('file')).toStrictEqual(file);
  //   expect(payload.get('luckyNumber')).toStrictEqual('8');
  //   expect([...payload.getAll('listValues[]')]).toEqual([...source.listValues]);
  //   const listMixValues = source.listMixValues.map(v => `${ v }`);
  //   expect([...payload.getAll('listMixValues[]')]).toEqual([...listMixValues]);
  //   expect(payload.get('nestedValues[hello]')).toEqual(source.nestedValues.hello);
  //   expect(payload.get('nestedValues[answer]')).toEqual(source.nestedValues.answer.toString());
  //   expect(payload.get('nestedValues[nested][again]')).toEqual(source.nestedValues.nested.again);
  // });
});
