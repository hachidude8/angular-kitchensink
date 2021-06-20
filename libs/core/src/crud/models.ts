export class HttpEndpoint {
  constructor(
    private url: string
  ) {
  }

  getUrl(): string {
    return this.url;
  }
}

export interface Page<T> {
  getContent(): T;
  getPaging(): Pageable;
}

export interface Pageable {
  of(page: number): Pageable;

  next(): Pageable;

  previousOrFirst(): Pageable;

  isPaged(): boolean;

  hasPrevious(): boolean;

  hasNext(): boolean;

  getPageIndex(): number;

  getPageSize(): number;
}
