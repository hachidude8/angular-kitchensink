import { AuthContextService, AuthSubject } from '@aks/security/authentication';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthViewHandler } from './auth-view-handler';


export type AuthCheckMode = 'authenticated' | 'unauthenticated';

@Directive({ selector: '[aksIsAuthenticated]' })
export class IsAuthenticatedDirective extends AuthViewHandler {

  private mode: AuthCheckMode = 'authenticated';

  constructor(
    protected context: AuthContextService,
    protected templateRef: TemplateRef<never>,
    protected viewContainer: ViewContainerRef
  ) {
    super(context, templateRef, viewContainer);
  }

  set aksIsAuthenticatedCheckMode(mode: AuthCheckMode) {
    this.mode = mode;
  }

  set aksIsAuthenticatedNotGranted(alternativeView: TemplateRef<never>) {
    this.alternativeView = alternativeView;
  }

  updateView(subject?: AuthSubject<unknown>): void {
    (subject && !this.objectInView) ? this.showContent()
                                    : this.clearContainer();
  }

  protected onContextChange(subject: AuthSubject<unknown>): void {
    this.updateView(subject);
  }

}
