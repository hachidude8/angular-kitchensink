import { NotificationContents } from '@aks/core/notification';


export interface SnackbarNotificationContents extends NotificationContents {
  closeAction?: string | undefined;
}
