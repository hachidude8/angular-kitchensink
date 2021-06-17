import { Injectable } from '@angular/core';
import { ActionResult, ConfirmContents } from './models';


@Injectable()
export abstract class ConfirmationService {
  abstract confirm(contents: ConfirmContents): Promise<ActionResult>;
}
