import { Directive, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { ConfirmContents, ConfirmDetails } from './models';
import { CONFIRMATION_MESSAGE } from './tokens';


@Directive({ selector: '[aksConfirmAction]' })
export class ConfirmActionDirective {

  private contents: ConfirmContents;

  @Output() confirmed = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService,
              @Inject(CONFIRMATION_MESSAGE) private details: ConfirmDetails) {
    this.contents = details;
  }

  @Input('aksConfirmAction')
  set aksConfirmAction(contents: ConfirmContents | string | undefined) {
    if (contents) {
      this.contents = typeof contents === 'string' ? { title: contents } : contents;
    }
  }

  @HostListener('click', ['$event'])
  async onHostClick(): Promise<void> {
    await this.confirmAction();
  }

  private async confirmAction(): Promise<void> {
    const result = await this.confirmationService.confirm(this.contents);
    if (result.isConfirmed()) {
      this.confirmed.emit();
    } else if (result.isRejected()) {
      this.rejected.emit();
    } else {
      this.cancelled.emit();
    }
  }
}
