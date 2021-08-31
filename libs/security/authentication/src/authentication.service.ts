import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationResult, AuthenticationConfig, Credentials } from './models';


@Injectable()
export abstract class AuthenticationService {

  protected constructor(
    protected http: HttpClient,
    protected config: AuthenticationConfig
  ) {
  }

  authenticate(credentials: Credentials): Observable<AuthenticationResult> {
    return this.request(credentials).pipe(
      switchMap(result => this.verifyResult(result)),
      tap(result => this.storeAuthenticationResult(result))
    );
  }

  protected request(credentials: Credentials): Observable<AuthenticationResult> {
    const options = Object.assign({}, this.config.httpOptions);
    return this.http.post<AuthenticationResult>(this.config.url, credentials, options);
  }

  protected abstract verifyResult(result: AuthenticationResult): Observable<AuthenticationResult>;

  protected abstract storeAuthenticationResult(result: AuthenticationResult): void;
}
