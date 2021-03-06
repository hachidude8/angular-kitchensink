import { AuthContextService, AuthSubject } from '@aks/security/authentication';
import { OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';


export abstract class AuthViewHandler implements OnInit, OnDestroy {
  protected readonly destroyed$ = new ReplaySubject<boolean>(1);
  protected objectInView = false;
  protected alternativeView: TemplateRef<never> | undefined;

  protected constructor(
    protected context: AuthContextService,
    protected templateRef: TemplateRef<never>,
    protected viewContainer: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.watchContextChanges();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  abstract updateView(): void;

  protected watchContextChanges(): void {
    this.context.get().subscribe((subject) => this.onContextChange(subject));
  }

  protected showContent(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.objectInView = true;
  }

  protected clearContainer(): void {
    this.viewContainer.clear();
    this.objectInView = false;
  }

  protected showAlternative(): void {
    if (this.alternativeView) {
      this.viewContainer.createEmbeddedView(this.alternativeView);
    }
  }

  protected abstract onContextChange(subject: AuthSubject<unknown>): void;
}
