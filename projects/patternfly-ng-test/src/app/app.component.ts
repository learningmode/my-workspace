import { ChangeDetectorRef, Component } from '@angular/core';
import { ActionConfig } from './patternfly/action/action-config';
import { EmptyStateConfig } from './patternfly/empty-state/empty-state-config';
import { NotificationGroup } from './patternfly/notification/notification-group';
import { Action } from './patternfly/action/action';
import {Notification} from './patternfly/notification/notification';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'patternfly-ng-test';
  actionConfig!: ActionConfig;
  actionText: string = '';
  currentTime!: number;
  emptyStateConfig!: EmptyStateConfig;
  empty: boolean = false;
  hide: boolean = true;
  groups!: NotificationGroup[];
  unread: boolean = false;

  emptyStateConfig2!: EmptyStateConfig;
  actionsText: string = '';


  constructor(private chRef: ChangeDetectorRef) {
    this.emptyStateConfig = {
      iconStyleClass: 'pficon-info',
      title: 'Tab4: There are no notifications to display .'
    };
  }

  ngOnInit(): void {

    this.actionConfig = {
      moreActions : [{
        title: 'Action',
        tooltip: 'Perform an action'
      }, {
        title: 'Another Action',
        tooltip: 'Do something else'
      }, {
        title: 'Disabled Action',
        tooltip: 'Unavailable action',
        disabled: true
      }, {
        title: 'Something Else',
        tooltip: ''
      }, {
        separator: true
      }, {
        title: 'Grouped Action 1',
        tooltip: 'Do something'
      }, {
        title: 'Grouped Action 2',
        tooltip: 'Do something similar'
      }]
    } as ActionConfig ;
    this.currentTime = (new Date()).getTime();
    this.setGroups();
  }

  setGroups(){
    this.groups = [{
        heading: 'Notification Tab 1',
        subHeading: '5 New Events',
        notifications: [{
          isViewing: true,
          message: 'A New Event! Huzzah! Bold.',
          type: 'info',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
        }, {
          isViewing: true,
          message: 'Another Event Notification',
          type: 'success',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
        }, {
          isViewing: false,
          message: 'Another Event Notification',
          type: 'warning',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
        }, {
          isViewing: false,
          message: 'Another Event Notification',
          type: 'danger',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
        }, {
          isViewing: true,
          message: 'A New Event! Huzzah! Bold',
          type: 'info',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
        }, {
          isViewing: true,
          message: 'Another Event Notification',
          type: 'error',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
        }, {
          isViewing: false,
          message: 'Another Event Notification',
          type: 'success',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
        }, {
          isViewing: false,
          message: 'Another Event Notification',
          type: 'warning',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
        }, {
          isViewing: true,
          message: 'Another Event Notification',
          type: 'info',
          moreActions: this.actionConfig.moreActions,
          timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
        }],
        loading: true
      }]

      this.emptyStateConfig2 = {
        actions: this.actionConfig,
        iconStyleClass: 'pficon-warning-triangle-o',
        info: 'This is the Empty State component. The goal of a empty state pattern is to provide a good first ' +
          'impression that helps users to achieve their goals. It should be used when a view is empty because no ' +
          'objects exists and you want to guide the user to perform specific actions.',
        helpLink: {
          hypertext: 'Empty State example',
          text: 'For more information please see the',
          url: '#/emptystate'
        },
        title: 'No Items Available'
      };

  }

  unreadNotifications($event: boolean): void {
    this.unread = $event;
    this.chRef.detectChanges();
    if (!this.unread) {
      this.actionText += 'No Notification \n';
    }
  }

  close($event: boolean): void {
    this.hide = !this.hide;
    this.actionText += 'Close drawer \n';
  }


  handleAction(action: Action): void {
    this.actionText = action.title + '\n' + this.actionText;
  }

  markAsRead(notify: Notification) {
    notify.isViewing = true;
    this.actionText += 'Mark notification read \n';
  }

  handleAction2($event: Action): void {
    this.actionsText = $event.title + '\n' + this.actionsText;
  }

}
