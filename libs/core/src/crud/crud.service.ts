export interface CrudService {
  getBy(props?: Record<string, unknown>): unknown;

  getOneBy(props: Record<string, unknown>): unknown;

  save(datum: Record<string, unknown>): unknown;

  deleteBy(datum: Record<string, unknown>): unknown;
}

