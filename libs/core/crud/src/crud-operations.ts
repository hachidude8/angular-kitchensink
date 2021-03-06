import { RequestConf } from './request-conf';
import { Query } from './query';


export interface CrudOperations {
  getBy(query?: Query, conf?: RequestConf): unknown;

  getOneBy(query?: Query, conf?: RequestConf): unknown;

  save(data: unknown): unknown;

  delete(data: unknown): unknown;
}

