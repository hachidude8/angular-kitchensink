import { Query, RequestConf } from './models';


export interface CrudService {
  getBy(query?: Query, conf?: RequestConf): unknown;

  getOneBy(query?: Query, conf?: RequestConf): unknown;

  save(data: unknown): unknown;

  deleteBy(data: unknown): unknown;
}

