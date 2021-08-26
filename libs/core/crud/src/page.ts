import { PageEvent } from '@angular/material/paginator';


export interface Page<T> {
  getContents(): T[];

  setContents(contents: T[]): void;

  isPaged(): boolean;

  length: number;
}

// TODO: Improve paged response data and contents
// Create factory
// Create PageRequest that utilizes Query
export class PagedResponse<T> implements Page<T>, PageEvent {
  constructor(
    private contents: T[],
    private index: number,
    private size: number,
    private total: number,
    private paged = true
  ) {
  }

  getContents(): T[] {
    return this.contents;
  }

  setContents(contents: T | T[]): void {
    this.contents = Array.isArray(contents) ? contents : [contents];
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
