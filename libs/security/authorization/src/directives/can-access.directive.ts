import { AuthContextService } from '@aks/security/authentication';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AclService } from '../acl.service';
import { AuthResourceKey } from '../models';
import { AuthViewHandler } from './auth-view-handler';


@Directive({ selector: '[aksCanAccess]' })
export class CanAccessDirective extends AuthViewHandler {
  private resource: AuthResourceKey | undefined;

  constructor(
    protected acl: AclService,
    protected context: AuthContextService,
    protected templateRef: TemplateRef<never>,
    protected viewContainer: ViewContainerRef
  ) {
    super(context, templateRef, viewContainer);
  }

  set aksCanAccess(resource: AuthResourceKey) {
    this.resource = resource;
  }

  set aksCanAccessAlternativeView(alternativeView: TemplateRef<never>) {
    this.alternativeView = alternativeView;
  }

  updateView(): void {
    if (!this.resource) {
      this.showContent();
      return;
    }
    this.acl.canAccess(this.resource).subscribe(granted => {
      (granted) ? this.showContent()
                : this.clearContainer();
    });
  }

  protected onContextChange(): void {
    this.updateView();
  }


}
