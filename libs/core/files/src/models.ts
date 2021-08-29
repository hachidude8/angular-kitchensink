import { Query } from '@aks/core/crud';


export type UploadContents = File | FileList | unknown;
export type UploadPayload = Record<string, UploadContents>;

export interface UploadRequest {
  url: string;
  payload: UploadPayload;
}

export interface DownloadRequest {
  url: string;
  filename: string;
  query?: Query;
}

export interface DownloadResponse {
  blob: Blob;
  type: string;
}
