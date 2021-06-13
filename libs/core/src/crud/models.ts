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
}

export interface Pageable {
  isPaged(): boolean;

  isUnPaged(): boolean;

  hasPrevious(): boolean;

  hasNext(): boolean;

  getPageNumber(): number;

  getPageSize(): number;

  /**
   * Creates an unpaged instance of {@link Pageable}
   */
  unpaged(): Pageable;

  next(): Pageable;

  previousOrFirst(): Pageable;

  withNumber(value: number): Pageable;
}
