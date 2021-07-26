import { Injectable } from '@angular/core';
import { ConfirmationResult } from './confirmation-result';
import { Result } from './constants';
import { ConfirmContents } from './models';
import { isConfirmDetails } from './utils';


@Injectable({ providedIn: 'root' })
export class ConfirmationService {

  /**
   * Shows a confirm dialog according to the given contents.
   *
   * @return Promise with the confirmation result
   * @throws Unsupported contents type
   */
  confirm(contents: ConfirmContents): Promise<ConfirmationResult> {
    if (!isConfirmDetails(contents)) {
      throw new Error('Unsupported confirmation contents type. Use "ConfirmDetails" as value');
    }
    return new Promise<ConfirmationResult>((resolve => {
      const result = confirm(contents.title);
      resolve(new ConfirmationResult(result ? Result.CONFIRM : Result.CANCEL));
    }));
  };
}
