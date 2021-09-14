import { AuthContextService, AuthSubject } from '@aks/security/authentication';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthViewHandler } from './auth-view-handler';


@Directive({ selector: '[aksIsSameSubject]' })
export class IsSameSubjectDirective extends AuthViewHandler {
  private checkSubject: unknown;

  constructor(
    protected context: AuthContextService,
    protected templateRef: TemplateRef<never>,
    protected viewContainer: ViewContainerRef
  ) {
    super(context, templateRef, viewContainer);
  }

  set aksIsSameSubjectCheckSubject(subject: unknown) {
    this.checkSubject = subject;
  }

  updateView(subject?: AuthSubject<unknown>): void {
    (subject?.equals(this.checkSubject) && !this.objectInView) ? this.showContent()
                                                              : this.clearContainer();
  }

  protected onContextChange(subject: AuthSubject<unknown>): void {
    this.updateView(subject);
  }

}
