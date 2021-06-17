import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ConfirmationService } from '../confirmation.service';
import { ConfirmContents } from '../models';


@Directive({ selector: '[aksConfirmAction]' })
export class ConfirmActionDirective {

  private contents: ConfirmContents;

  @Output() confirmed = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {
  }

  @Input('askConfirmAction')
  set aksConfirmAction(contents: ConfirmContents) {
    this.contents = contents;
  }

  @HostListener('click', ['$event'])
  onHostClick(): void {
    this.confirmAction();
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
