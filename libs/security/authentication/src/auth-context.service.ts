import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthSubject } from './auth-subject';
import { UNAUTHENTICATED } from './constants';


@Injectable({ providedIn: 'root' })
export class AuthContextService <T = AuthSubject<unknown>> {
  private readonly subjectStore = new BehaviorSubject<T>(UNAUTHENTICATED);

  authorize(subject: T): void {
    this.subjectStore.next(subject);
  }

  get(): Observable<T> {
    return this.subjectStore.asObservable();
  }

  instant(): T {
    return this.subjectStore.getValue();
  }

  clear(): void {
    this.subjectStore.next(UNAUTHENTICATED);
  }
}
