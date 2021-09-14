import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthContextService } from '@aks/security/authentication';
import { ACL, AuthResourceKey } from './models';
import { ACL_TOKEN } from './tokens';


@Injectable({ providedIn: 'root' })
export class AclService {
  constructor(
    private authContext: AuthContextService,
    @Inject(ACL_TOKEN) private acl: ACL
  ) {
  }

  /**
   * Checks if the authenticated user can access the specified resource.
   */
  canAccess(resource: AuthResourceKey): Observable<boolean> {
    if (!this.acl.has(resource)) {
      return of(false);
    }
    const roles = this.acl.get(resource) || [];
    return this.authContext.get().pipe(
      map(subject => subject.hasRole(roles))
    );
  }
}
