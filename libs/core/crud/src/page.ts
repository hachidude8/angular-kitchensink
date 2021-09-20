import { PageDetails } from './page-details';


export interface Page<T> {
  getContents(): T[];

  getAt(index: number): T;

  isPaged(): boolean;

  getPageDetails(): PageDetails;
}
