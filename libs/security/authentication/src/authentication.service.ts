import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthSubject } from './auth-subject';
import { AuthenticationResult, AuthenticationConfig, Credentials } from './models';
import { AuthContextService } from './auth-context.service';


@Injectable()
export abstract class AuthenticationService {

  protected constructor(
    protected http: HttpClient,
    protected context: AuthContextService,
    protected config: AuthenticationConfig
  ) {
  }

  authenticate(credentials: Credentials): Observable<AuthenticationResult> {
    return this.request(credentials).pipe(
      switchMap(result => this.verifyResult(result)),
      map(result => this.convertToAuthenticatedSubject(result)),
      tap(result => this.authorizeSubject(result))
    );
  }

  protected request(credentials: Credentials): Observable<AuthenticationResult> {
    const options = { ...this.config.httpOptions };
    return this.http.post<AuthenticationResult>(this.config.url, credentials, options);
  }

  protected abstract verifyResult(result: AuthenticationResult): Observable<AuthenticationResult>;

  protected abstract convertToAuthenticatedSubject(result: unknown): AuthSubject<unknown>;

  protected authorizeSubject(result: AuthSubject<unknown>): void {
    this.context.authorize(result);
  }
}
