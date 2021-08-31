import { NotificationConfig, NotificationDetails, NotificationService } from '@aks/core/notification';
import { isRecord } from '@aks/utils';
import { EmbeddedViewRef, Inject, Injectable, TemplateRef } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar
} from '@angular/material/snack-bar';
import { SnackbarNotificationContents } from './models';


@Injectable({ providedIn: 'root' })
export class SnackbarNotificationService extends NotificationService {
  private ref: MatSnackBarRef<TextOnlySnackBar | EmbeddedViewRef<unknown>> | undefined;

  constructor(private snackBar: MatSnackBar,
              @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) private config: MatSnackBarConfig) {
    super();
  }

  show(details: NotificationDetails,
       config?: NotificationConfig): Promise<MatSnackBarRef<TextOnlySnackBar | EmbeddedViewRef<unknown>>> {
    if (!isRecord(details.contents) && !(details.contents instanceof TemplateRef)) {
      throw new Error(`Unsupported contents type. Please provide NotificationDetails`);
    }
    const options = this.mergeConfig(config);
    const ref = this.open(details, options);
    this.registerActions(ref, details);
    this.ref = ref;
    return Promise.resolve(this.ref);
  }

  private open(details: NotificationDetails,
               options: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar | EmbeddedViewRef<unknown>> {
    const { contents } = details;
    if (contents instanceof TemplateRef) {
      return this.snackBar.openFromTemplate(contents, options);
    } else {
      const notification = this.mergeTexts(contents as SnackbarNotificationContents);
      return this.snackBar.open(notification.message, notification.closeAction, options);
    }
  }

  private mergeTexts(contents: SnackbarNotificationContents): SnackbarNotificationContents {
    const copy = { ...contents };
    if (!copy.closeAction) {
      copy.closeAction = 'Close';
    }
    return copy;
  }

  private mergeConfig(config?: NotificationConfig): MatSnackBarConfig {
    const snackbar = Object.assign({}, this.config);
    if (config?.timeout) {
      snackbar.duration = config.timeout;
    }
    return snackbar;
  }

  private registerActions(ref: MatSnackBarRef<unknown>, contents: NotificationDetails): void {
    ref.onAction().subscribe(
      data => {
        if (contents?.onAction) {
          contents.onAction(data);
        }
      },
      e => console.error(e)
    );
    ref.afterOpened().subscribe(
      data => {
        if (contents.afterOpened) {
          contents.afterOpened(data);
        }
      },
      e => console.error(e)
    );
    ref.afterDismissed().subscribe(
      data => {
        if (contents.afterDismissed) {
          contents.afterDismissed(data);
        }
      },
      e => console.error(e)
    );
  }
}
