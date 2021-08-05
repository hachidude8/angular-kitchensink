import { Result } from './constants';


export class ConfirmationResult {
  constructor(private readonly result: Result) {
  }

  isConfirmed(): boolean {
    return this.result === Result.CONFIRM;
  }

  isRejected(): boolean {
    return this.result === Result.REJECT;
  }

  isCancelled(): boolean {
    return this.result === Result.CANCEL;
  }
}
