import { PageDetails } from './page-details';


export interface Page<T> {
  getContents(): T[];

  isPaged(): boolean;

  getPageDetails(): PageDetails;
}
