import { Notification } from "./notification";
import { EmptyStateConfig } from "../empty-state/empty-state-config";

/**
 * An object containing properties for notification groups
 */
export class NotificationGroup {


  /**
   *  heading area for each notification group
   *
   */
  heading!: string;


  /**
   * sub-heading area for each notification group
   *
   */
  subHeading?: string;


  /**
   *  Configuration properties for a notification message
   */
  notifications!: Notification[];

  /**
   * Flag for panel collapse
   */
  open?: boolean;

  /**
   * Flag for the loading spinner
   */
  loading?: boolean;


  /**
   * Empty state config for notification
   */
  emptyStateConfig?: EmptyStateConfig;
}

/**
 * An object containing properties for notification groups
 *
 * @deprecated This is a fallback for the previous erroneous class name of NotificationGroup
 *
 * See: https://github.com/patternfly/patternfly-ng/issues/451
 */
export class NotificaitonGroup extends NotificationGroup {

}
