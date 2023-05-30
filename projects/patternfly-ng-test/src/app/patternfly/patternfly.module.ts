import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action/action.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';

import { FormsModule } from '@angular/forms';
import { NotificationDrawerComponent } from './notification/notification-drawer/notification-drawer.component';

@NgModule({
  declarations: [
    ActionComponent,
    EmptyStateComponent,
    NotificationDrawerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    ActionComponent,
    EmptyStateComponent,
    NotificationDrawerComponent
  ]
})
export class PatternflyModule { }
