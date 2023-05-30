import { Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation } from '@angular/core';

  import { clone, cloneDeep, defaults, has, isEqual } from 'lodash';

  import { Action } from './action';
  import { ActionConfig } from './action-config';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit,DoCheck{
  /**
   * The action config containing component properties
   */
  @Input() config!: ActionConfig;

  /**
   * Action template for custom actions
   */
  @Input() template!: TemplateRef<any>;

  /**
   * The event emitted when an action has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  private defaultConfig = {
    moreActionsDisabled: false,
    moreActionsVisible: true
  } as ActionConfig;
  isMoreActionsDropup: boolean = false;
  prevConfig!: ActionConfig;
  action!:Action;

  /**
   * The default constructor
   *
   * @param el The element reference for this component
   */
  constructor(private el: ElementRef) {
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
    // lodash has issues deep cloning templates -- best seen with list component
    this.prevConfig = clone(this.config);
  }

  // Private

  public handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  /**
   * Set flag indicating if kebab should be shown as a dropdown or dropup
   *
   * @param $event The MouseEvent triggering this function
   */
  public initMoreActionsDropup($event: MouseEvent): void {
    window.requestAnimationFrame(() => {
      let kebabContainer = this.closest($event.target, '.dropdown-kebab-pf.open', 'pfng-list-actions');
      let listContainer = this.closest(this.el.nativeElement, '.list-pf', 'pfng-list');
      if (kebabContainer === null || listContainer === null) {
        return;
      }

      let dropdownButton = kebabContainer.querySelector('.dropdown-toggle');
      let dropdownMenu = kebabContainer.querySelector('.dropdown-menu');
      let buttonRect = (dropdownButton)?dropdownButton.getBoundingClientRect():null;
      let menuRect = (dropdownMenu)?dropdownMenu.getBoundingClientRect():null;
      let menuTop = (buttonRect !== null && menuRect !== null)?buttonRect.top - menuRect.height: 0;
      let menuBottom = (buttonRect !== null && menuRect !== null)?buttonRect.top + buttonRect.height + menuRect.height:0;
      let parentRect = listContainer.getBoundingClientRect();

      if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
        this.isMoreActionsDropup = false;
      } else {
        this.isMoreActionsDropup = true;
      }
    });
  }

  // Utils

  /**
   * Get the closest ancestor based on given selector
   *
   * @param el The HTML element to start searching for matching ancestor
   * @param selector The selector to match
   * @param stopSelector If this selector is matched, the search is stopped
   * @returns {HTMLElement} The matching HTML element or null if not found
   */
  private closest(el: any, selector: string, stopSelector: string): HTMLElement {
    let retval = null;
    while (el) {
      if (el.matches(selector)) {
        retval = el;
        break;
      } else if (stopSelector && el.matches(stopSelector)) {
        break;
      }
      el = el.parentElement;
    }
    return retval;
  }

}
