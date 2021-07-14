import { PageEvent } from '@angular/material/paginator';


export class HttpEndpoint {
  constructor(
    private url: string
  ) {
  }

  getUrl(): string {
    return this.url;
  }
}

export abstract class Page<T> {
  abstract getContents(): T[];

  abstract setContents(contents: T[]): void;

  abstract isPaged(): boolean;

  abstract get length(): number;
}

export class PagedResponse<T> extends Page<T> implements PageEvent {
  constructor(
    private contents: T[],
    private index: number,
    private size: number,
    private total: number,
    private paged = true
  ) {
    super();
  }

  getContents(): T[] {
    return this.contents;
  }

  setContents(contents: T[]): void {
    this.contents = contents;
  }

  isPaged(): boolean {
    return this.paged;
  }

  get length(): number {
    return this.contents?.length || 0;
  }

  get pageIndex(): number {
    return this.index;
  }

  get pageSize(): number {
    return this.size;
  }

  get previousPageIndex(): number {
    return (this.index > 1) ? this.index - 1 : 1;
  }

  toPageEvent(): PageEvent {
    return {
      pageIndex: this.pageIndex - 1,
      pageSize: this.pageSize,
      previousPageIndex: this.previousPageIndex,
      length: this.total,
    };
  }
}

export interface Query {
  toObject(): Record<string, unknown>;
}

// General service configuration definition
export type RequestConf = unknown;

// Angular HttpClient's options definition placeholder
export type HttpOptions = Record<string, unknown>;
