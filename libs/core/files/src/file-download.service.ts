import { HttpOptions } from '@aks/core/crud';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DownloadRequest, DownloadResponse } from './models';


@Injectable({ providedIn: 'root' })
export class FileDownloadService {

  constructor(protected http: HttpClient,
              @Inject(DOCUMENT) protected document: Document) {
  }

  download(req: DownloadRequest): Observable<void> {
    const options = this.getDownloadOptions(req);
    return this.requestDownload(req.url, options).pipe(
      map(res => this.serializeDownloadRes(res)),
      map(res => this.downloadFile(res, req))
    );
  }

  protected getDownloadOptions(req: DownloadRequest): HttpOptions {
    // Necessary http client configuration
    const options: HttpOptions = {
      // Angular definitions do not allow overwriting the default values, so they must be casted as the default values.
      responseType: 'arraybuffer' as 'json',
      observe: 'response' as 'body'
    };
    if (req.query) {
      options.params = new HttpParams({ fromObject: req.query.toObject() })
    }
    return options;
  }

  protected requestDownload(url: string, options: HttpOptions): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.get<HttpResponse<ArrayBuffer>>(url, options);
  }

  protected serializeDownloadRes(res: HttpResponse<ArrayBuffer>): DownloadResponse {
    const type = res.headers.get('Content-Type');
    return {
      type,
      blob: new Blob([res.body], { type })
    };
  }

  protected downloadFile(res: DownloadResponse, req: DownloadRequest): void {
    const url = window.URL.createObjectURL(res.blob);
    const link = this.document.createElement('a');
    link.href = url;
    if (req.filename) {
      link.download = req.filename;
    }
    this.document.appendChild(link);
    link.click();
    this.document.removeChild(link);
  }
}
