import { QueryParamsHandling } from '@angular/router';
import { Query } from './query';


/**
 * Name acts as a query role identifier
 * Query is just the value
 */
export interface AppliedFilter {
  name: string;
  query: Query;
}

/**
 * Filters service configuration
 */
export interface FilterOptions {
  name: string;
  useParams?: FilterParamsOptions;
}

export interface FilterParamsOptions {
  handling: QueryParamsHandling;
}
