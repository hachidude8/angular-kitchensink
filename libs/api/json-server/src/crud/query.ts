import { PageDetails, Query } from '@aks/core/crud';
import { Sort } from '@angular/material/sort';


/**
 * JSON Server API query definition
 */
export class JApiQuery implements Query {
  [p: string]: unknown;

  // Pagination
  page?: number;
  limit?: number;
  total?: number;
  // Slice
  start?: number;
  end?: number;
  // Sort
  sort?: string;
  order?: 'asc' | 'desc';

  static fromObject(datum: Partial<JApiQuery>): JApiQuery {
    return Object.assign(new JApiQuery(), datum);
  }

  static fromPageEvent(page: PageDetails, sort?: Sort): JApiQuery {
    const conf: Partial<JApiQuery> = {
      page: page.pageIndex + 1,
      limit: page.pageSize
    };
    if (sort) {
      conf.sort = sort.active;
      if (sort.direction) {
        conf.order = sort.direction;
      }
    }
    return JApiQuery.fromObject(conf);
  }

  /**
   * Returns the current query in a JSON Server compatible format
   */
  toObject(): Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>> {
    const conf: Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>> = {};

    if (this.page) {
      conf._page = this.page;
    }
    if (this.limit) {
      conf._limit = this.limit;
    }
    if (this.total) {
      conf._total = this.total;
    }
    if (this.start) {
      conf._start = this.start;
    }
    if (this.end) {
      conf._end = this.end;
    }
    if (this.sort) {
      conf._sort = this.sort;
    }
    if (this.order) {
      conf._order = this.order;
    }

    return conf;
  }
}
