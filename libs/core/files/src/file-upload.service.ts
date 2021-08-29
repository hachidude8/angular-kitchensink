import { isRecord } from '@aks/utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadPayload, UploadRequest } from './models';


@Injectable({ providedIn: 'root' })
export class FileUploadService {

  constructor(protected http: HttpClient) {
  }

  upload(req: UploadRequest): Observable<unknown> {
    const payload = this.serializePayload(req.payload);
    return this.startUpload(req.url, payload).pipe(
      // track upload progress?
      // wait for result
      // return result
    );
  }

  protected serializePayload(payload: UploadPayload): FormData {
    if (!isRecord(payload)) {
      throw new Error(`Payload must be a valid Record type. Provided value was ${ typeof payload }`);
    }
    return this.convertPayload(payload);
  }

  /**
   * Recursive payload conversion to FormData
   */
  protected convertPayload(payload: unknown, source: FormData = new FormData(), parentKey?: string): FormData {
    const payloadIsRecord = !!isRecord(payload);
    const payloadIsArray = !!Array.isArray(payload);
    if (!payloadIsRecord && !payloadIsArray) {
      if (parentKey) {
        source.append(parentKey, payload as never);
      }
      return source;
    }

    const entries = Object.entries(payload);
    for (let i = 0; i < entries.length; i++) {
      const [eKey, value] = entries[i];
      const valueIsRecord = !!isRecord(value);
      const valueIsArray = !!Array.isArray(value);

      // Define key
      let key = eKey;
      if (parentKey) {
        if (payloadIsRecord) {
          key = `${ parentKey }[${ eKey }]`;
        } else if (payloadIsArray) {
          key = valueIsArray ? `${ parentKey }[${ i }]` : `${ parentKey }[]`
        }
      }

      // Assign value
      if (value instanceof File || value instanceof Blob) {
        source.append(key, value);
      } else if (value instanceof FileList) {
        Array.from(value).forEach((file, index) => {
          const compositeKey = `${ key }[${ index }]`;
          source.append(compositeKey, file);
        });
      } else if (valueIsRecord || valueIsArray) {
        this.convertPayload(value, source, key);
      } else if (typeof value === 'boolean') {
        source.append(key, `${ value }`);
      } else if (value != null) {
        source.append(key, value);
      }
    }
    return source;
  }

  protected startUpload(url: string, payload: FormData): Observable<unknown> {
    return this.http.post(url, payload)
  }
}
