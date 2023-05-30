import { Component,  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation } from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';
import { Action } from '../action/action';
import { EmptyStateConfig } from './empty-state-config';


@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit,DoCheck{

  /**
   * The empty state config containing component properties
   */
  @Input() config!: EmptyStateConfig;

  /**
   * The event emitted when an action is selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  private defaultConfig = {
    title: 'No Items Available'
  } as EmptyStateConfig;
  private prevConfig!: EmptyStateConfig;

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
  }

  /**
   * Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  /**
   * Set up default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    this.prevConfig = cloneDeep(this.config);
  }

  // Private

  public handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

}
