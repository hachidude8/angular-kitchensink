import { AuthContextService, AuthSubject } from '@aks/security/authentication';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AclService } from './acl.service';
import { ACL } from './models';
import { ACL_TOKEN } from './tokens';


const AclProvider: Provider = {
  provide: ACL_TOKEN,
  useFactory: () => {
    const acl: ACL = new Map();
    acl.set('authorized', ['test']);
    acl.set('unauthorized', ['unauthorized']);
    return acl;
  }
};

const TestAuthSubject = new class extends AuthSubject<unknown> {
  constructor() {
    super(undefined);
  }
  getRoles(): string[] {
    return ['test'];
  }
  equals(): boolean {
    return false;
  }
};

describe('AclService', () => {
  let service: AclService;
  let authContext: AuthContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthContextService,
        AclProvider,
      ]
    });
    service = TestBed.inject(AclService);
    authContext = TestBed.inject(AuthContextService);
  });

  it(`Should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`Subject should be able to access the resource`, () => {
    authContext.authorize(TestAuthSubject);
    service.canAccess('authorized').subscribe(result => {
      expect(result).toBeTruthy();
      authContext.clear();
    });
  });

  it(`Subject should not access the resource if doesn't have any roles`, () => {
    service.canAccess('authorized').subscribe(result => expect(result).toBeFalsy());
  });

  it(`Subject should not access the resource if it doesn't have the required role`, () => {
    authContext.authorize(TestAuthSubject);
    service.canAccess('unauthorized').subscribe(result => {
      expect(result).toBeFalsy();
      authContext.clear();
    });
  });
});
