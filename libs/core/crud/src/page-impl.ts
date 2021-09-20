import { Page } from './page';
import { PageDetails, emptyPageDetails } from './page-details';


export class PageImpl<T> implements Page<T> {
  constructor(
    private readonly contents: T[],
    private readonly page: PageDetails
  ) {
  }

  getContents(): T[] {
    return this.contents;
  }

  getAt(index: number): T {
    if (index < 0 || index > (this.contents.length - 1)) {
      throw new Error(`Invalid contents index "${index}"`)
    }
    return this.contents[index];
  }

  isPaged(): boolean {
    return this.page.pageIndex > -1;
  }

  getPageDetails(): PageDetails {
    return { ...this.page };
  }

  static from<T = unknown>(data: T[], page: Partial<PageDetails>): Page<T> {
    const pageIndex = page.pageIndex || -1;
    const details: PageDetails = {
      pageIndex,
      length: page?.length || data.length,
      pageSize: page?.pageSize || data.length,
      previousPageIndex: (pageIndex - 1)
    };
    return new PageImpl<T>(data, details);
  }

  static unpaged<T = unknown>(data: T[]): Page<T> {
    const details = emptyPageDetails();
    details.length = data.length;
    return new PageImpl<T>(data, details);
  }

  static empty<T = unknown>(): Page<T> {
    return new PageImpl<T>([], emptyPageDetails());
  }
}
