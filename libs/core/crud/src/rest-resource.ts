/**
 * REST resource definition.
 */
export class RestResource<ID = string | number | unknown> {
  constructor(readonly baseUrl: string,
              readonly segment: string) {
  }

  url(): string {
    return `${ this.baseUrl }/${ this.segment }`;
  }

  getById(id: ID): string {
    return `${ this.url() }/${ id }`;
  }

  save(): string {
    return this.url();
  }

  delete(id: ID): string {
    return `${ this.url() }/${ id }`;
  }
}

export type RestResourceStorage = Map<string, RestResource>;
