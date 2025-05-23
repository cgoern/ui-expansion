import { Component, Host, Element, Prop, Event, EventEmitter, Method, h } from '@stencil/core'
import { UiExpansionPanelDetails } from './../../types'

/**
 * A custom expansion panel component that can expand and collapse to show or hide details.
 *
 * @slot summary - Content is placed in the summary which toggles the expansion state.
 * @slot details - Content is placed in the details area which is expanded or collapsed.
 * @part summary - The summary area of the expansion panel.
 * @part details - The details area of the expansion panel.
 */
@Component({
  tag: 'ui-expansion-panel',
  styleUrl: 'ui-expansion-panel.css',
  shadow: true,
})
export class UiExpansionPanel {
  /**
   * A reference to the details element within the component.
   * This property is used to access the details element's scroll height and to observe changes in its size.
   */
  private detailsElement!: HTMLDivElement

  /**
   * A ResizeObserver instance used to monitor changes in the size of the details element.
   * This observer triggers the updateDetailsScrollHeight method whenever the size of the details element changes,
   * ensuring that the component can accurately adjust its height during expansion and collapse.
   */
  private resizeObserver: ResizeObserver

  /**
   * The scroll height of the details element.
   * This property is used to store the current scroll height of the details element,
   * which is necessary for calculating the expanded height during the expansion and collapse transitions.
   * It is updated whenever the size of the details element changes.
   */
  private detailsScrollHeight: number = 0

  /**
   * An instance of the animation frame.
   * This property is used to store the ID of the currently scheduled animation frame,
   * allowing the component to cancel any pending animation frames if necessary.
   * It is set to null when no animation frame is scheduled.
   */
  private animationFrameInstance: number | null = null

  /**
   * A collection of stylesheets used to manage CSS custom properties.
   * This property is used to store the stylesheets that are either adopted or part of the shadow DOM.
   * It is initialized in the connectedCallback method and used to dynamically update CSS custom properties
   * for the component's expanded height during expansion and collapse transitions.
   */
  private styleSheets: CSSStyleSheet[] | StyleSheetList

  /**
   * Arbitrary data associated with the expansion panel.
   * This property can be used to store any additional information or metadata
   * that needs to be associated with the expansion panel. The data can be of any type
   * and is typically used to pass contextual information or state that is relevant
   * to the panel's details or behavior.
   *
   * @type {unknown | null}
   */
  private _data: unknown | null = null

  /**
   * The host element of the component.
   * This property is automatically populated by Stencil and provides a reference
   * to the custom element instance. It can be used to access the element's
   * shadow DOM, attributes, and other properties.
   */
  @Element() element!: HTMLUiExpansionPanelElement

  /**
   * Event emitted when the expansion panel is toggled.
   * This event is triggered whenever the panel is expanded or collapsed,
   * providing details about the current state of the panel, including
   * a reference to the element, the expanded state, the panel's unique identifier,
   * and any associated data.
   *
   * @event uiExpansionPanelToggle
   * @type {CustomEvent<UiExpansionPanelDetails>}
   * @property {HTMLUiExpansionPanelElement} element - The host element of the expansion panel.
   * @property {boolean} expanded - The current expanded state of the panel.
   * @property {unknown | null} data - Any associated data or metadata related to the panel.
   */
  @Event() uiExpansionPanelToggle!: EventEmitter<UiExpansionPanelDetails>

  /**
   * Determines whether the panel is expanded or collapsed.
   * @default false
   */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false

  /**
   * Determines whether the panel can be collapsed by clicking on its summary.
   * If set to false, the panel will not collapse when the summary is clicked.
   * This property is useful when you want to enforce that the panel remains expanded
   * until another panel is expanded, typically used in conjunction with a parent component
   * that manages the expansion state of multiple panels.
   *
   * @type {boolean}
   * @default true
   */
  @Prop() collapsible: boolean = true

  /**
   * Data to be used within the expansion panel.
   * This property can be used to pass any data that needs to be accessed or displayed
   * within the expansion panel. The data can be of any type and is parsed from a JSON string
   * if provided as such.
   *
   * @type {any}
   */
  @Prop() data: string | null = null

  /**
   * Lifecycle method that is called when the component is first connected to the DOM.
   * Initializes the ResizeObserver to monitor changes in the details element's size
   * and sets up the styleSheets property to manage CSS custom properties.
   * Parses the data property if provided and logs a warning if parsing fails.
   */
  componentWillLoad() {
    this.resizeObserver = new ResizeObserver(this.updateDetailsScrollHeight)

    this.styleSheets = this.element.shadowRoot.adoptedStyleSheets
      ? this.element.shadowRoot.adoptedStyleSheets
      : this.element.shadowRoot.styleSheets

    if (this.data) {
      try {
        this._data = JSON.parse(this.data)
      } catch (error) {
        console.warn('Failed to parse data:', error)
      }
    }
  }

  /**
   * Lifecycle method that is called once the component has loaded.
   * Sets up a ResizeObserver to monitor changes in the details element's size
   * and adds an event listener for the transitionend event.
   * This ensures that the component can respond to size changes and transition
   * events appropriately, maintaining the correct expanded or collapsed state.
   */
  componentDidLoad() {
    this.resizeObserver.observe(this.detailsElement)
    this.detailsElement.addEventListener('transitionend', this.handleTransitionEnd)
  }

  /**
   * Lifecycle method that is called once the component is disconnected from the DOM.
   * Cleans up the ResizeObserver and event listeners to prevent memory leaks.
   * Cancels any pending animation frames to ensure no unnecessary updates occur.
   */
  disconnectedCallback() {
    this.resizeObserver.disconnect()
    this.detailsElement.removeEventListener('transitionend', this.handleTransitionEnd)

    if (this.animationFrameInstance !== null) {
      cancelAnimationFrame(this.animationFrameInstance)
    }
  }

  /**
   * Updates the scroll height of the details element.
   * This method is called by the ResizeObserver whenever the size of the details element changes.
   * It compares the observed scroll height with the current stored scroll height,
   * and updates the stored value if there is a difference. This ensures that the component
   * can accurately calculate the expanded height during transitions.
   */
  private updateDetailsScrollHeight = (): void => {
    const observedDetailsScrollHeight = this.detailsElement.scrollHeight

    if (observedDetailsScrollHeight !== this.detailsScrollHeight) {
      this.detailsScrollHeight = observedDetailsScrollHeight
    }
  }

  /**
   * Updates the CSS custom property for the expanded height of the details element.
   * This method dynamically sets the value of the --UI-Expansion-Panel-Details-Expanded-Height
   * custom property, which is used to control the height of the details element during
   * expansion and collapse transitions. It ensures that the correct height is applied
   * based on the current state of the panel.
   *
   * @param {string} value - The value to set for the expanded height. This can be a specific
   * height in pixels (e.g., '200px') or 'auto' to allow the details element to expand
   * to its natural height.
   */
  private updateExpandedHeightProperty = (value: string): void => {
    const rule = `:host {--UI-Expansion-Panel-Details-Expanded-Height: ${value}}`

    if (this.styleSheets instanceof StyleSheetList) {
      this.styleSheets[0].insertRule(rule)
    } else {
      const styleSheet = new CSSStyleSheet()
      styleSheet.replaceSync(rule)
      this.element.shadowRoot.adoptedStyleSheets = [...this.styleSheets, styleSheet]
    }
  }

  /**
   * Handles the transitionend event to set the expanded height to 'auto' after the transition ends.
   * This method is called whenever a CSS transition on the 'height' property completes.
   * If the panel is in the expanded state, it updates the CSS custom property for the expanded height
   * to 'auto', allowing the details element to adjust to its natural height. This ensures that the
   * details content is fully visible and not constrained by a fixed height.
   *
   * @param {TransitionEvent} event - The transitionend event object, which provides details about
   * the completed transition, including the name of the transitioned property.
   */
  private handleTransitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === 'height' && this.expanded) {
      this.updateExpandedHeightProperty('auto')
    }
  }

  /**
   * Toggles the expanded state of the panel.
   * This method is called when the summary is clicked, and it schedules an animation frame
   * to either expand or collapse the panel based on its current state.
   * If an animation frame is already scheduled, it cancels the pending frame before scheduling a new one.
   * It also emits the uiExpansionPanelToggle event with the current state and element reference.
   *
   * @returns {Promise<void>} A promise that resolves when the panel has been toggled.
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.expanded && this.collapsible) {
      this.collapse()
    } else {
      this.expand()
    }

    this.uiExpansionPanelToggle.emit({
      element: this.element,
      expanded: this.expanded,
      data: this._data,
    })
  }

  /**
   * Expands the panel to show the details.
   * This method updates the CSS custom property for the expanded height
   * and sets the expanded property to true. It ensures that the panel
   * transitions smoothly to its expanded state, making the details content
   * fully visible. The method returns a promise that resolves once the
   * panel is expanded.
   *
   * @returns {Promise<void>} A promise that resolves once the panel is expanded.
   */
  @Method()
  async expand(): Promise<void> {
    this.updateExpandedHeightProperty(`${this.detailsScrollHeight}px`)
    this.expanded = true
  }

  /**
   * Collapses the panel to hide the details.
   * This method updates the CSS custom property for the expanded height to 0px,
   * schedules an animation frame to apply the height change, and sets the expanded property to false.
   * It ensures that the panel transitions smoothly to its collapsed state, making the details content
   * hidden. The method returns a promise that resolves once the panel is collapsed.
   *
   * @returns {Promise<void>} A promise that resolves once the panel is collapsed.
   */
  @Method()
  async collapse(): Promise<void> {
    this.updateExpandedHeightProperty(`${this.detailsScrollHeight}px`)

    requestAnimationFrame(() => {
      this.updateExpandedHeightProperty('0px')
    })

    this.expanded = false
  }

  /**
   * Retrieves the data associated with the expansion panel.
   * This method returns the _data property, which contains any additional information
   * or metadata that has been associated with the expansion panel.
   * It provides a way to access the contextual information or state that is relevant
   * to the panel's details or behavior.
   *
   * @returns {Promise<unknown | null>} A promise that resolves to the data associated with the panel,
   * or null if no data is available.
   */
  @Method()
  async getData(): Promise<unknown | null> {
    return this._data
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div class="summary" onClick={async () => await this.toggle()}>
          <div part="summary" class="summary-content">
            <slot name="summary" />
          </div>
        </div>
        <div class="details" ref={(element) => (this.detailsElement = element)}>
          <div part="details" class="details-content">
            <slot name="details" />
          </div>
        </div>
      </Host>
    )
  }
}
