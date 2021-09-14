export abstract class AuthSubject<T> {
  protected constructor(
    private readonly details: T
  ) {
  }

  getDetails(): T {
    return this.details;
  }

  abstract getRoles(): string[];

  hasRole(roles: string[] | string): boolean {
    const checkList = Array.isArray(roles) ? roles : [roles];
    return this.getRoles().some(userRole => checkList.includes(userRole));
  }

  abstract equals(value: unknown): boolean;

}
