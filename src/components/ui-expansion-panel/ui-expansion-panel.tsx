import { Component, Host, Element, Prop, Event, EventEmitter, Method, h } from '@stencil/core'
import { UiExpansionPanelDetails } from './../../types'

/**
 * A custom expansion panel component that can expand and collapse to show or hide content.
 *
 * @slot header - Content is placed in the header which toggles the expansion state.
 * @slot content - Content is placed in the content area which is expanded or collapsed.
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
   * to the panel's content or behavior.
   *
   * @type {any}
   */
  private dataValue: object | null = null

  /**
   * The host element of the component.
   * This property is automatically populated by Stencil and provides a reference
   * to the custom element instance. It can be used to access the element's
   * shadow DOM, attributes, and other properties.
   */
  @Element() element!: HTMLUiExpansionPanelElement

  /**
   * Event emitted when the panel is expanded.
   * This event is triggered whenever the panel is expanded, providing details about the panel's state.
   * The event detail contains the element reference, the panel's unique identifier, and any associated data.
   */
  @Event() uiExpansionPanelExpand!: EventEmitter<UiExpansionPanelDetails>

  /**
   * Determines whether the panel is expanded or collapsed.
   * @default false
   */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false

  /**
   * Determines whether the panel can be collapsed by clicking on its header.
   * If set to false, the panel will not collapse when the header is clicked.
   * This property is useful when you want to enforce that the panel remains expanded
   * until another panel is expanded, typically used in conjunction with a parent component
   * that manages the expansion state of multiple panels.
   *
   * @type {boolean}
   * @default true
   */
  @Prop() collapsible: boolean = true

  /**
   * A unique identifier for the expansion panel.
   * This property can be used to distinguish between multiple expansion panels
   * in the same context, allowing for better management and control of individual panels.
   *
   * @type {string}
   */
  @Prop() _id: string | null = null

  /**
   * Data to be used within the expansion panel.
   * This property can be used to pass any data that needs to be accessed or displayed
   * within the expansion panel. The data can be of any type and is parsed from a JSON string
   * if provided as such.
   *
   * @type {any}
   */
  @Prop() _data: string | null = null

  /**
   * Lifecycle method that is called when the component is first connected to the DOM.
   * Initializes the ResizeObserver to monitor changes in the details element's size
   * and sets up the styleSheets property to manage CSS custom properties.
   */
  componentWillLoad() {
    this.resizeObserver = new ResizeObserver(this.updateDetailsScrollHeight)

    this.styleSheets = this.element.shadowRoot.adoptedStyleSheets
      ? this.element.shadowRoot.adoptedStyleSheets
      : this.element.shadowRoot.styleSheets

    if (this._data) {
      try {
        this.dataValue = JSON.parse(this._data)
      } catch (error) {
        console.error('Failed to parse _data:', error)
      }
    }
  }

  /**
   * Lifecycle method that is called once the component has loaded.
   * Sets up a ResizeObserver to monitor changes in the details element's size
   * and adds an event listener for the transitionend event.
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
   */
  private updateDetailsScrollHeight = (): void => {
    const observedDetailsScrollHeight = this.detailsElement.scrollHeight

    if (observedDetailsScrollHeight !== this.detailsScrollHeight) {
      this.detailsScrollHeight = observedDetailsScrollHeight
    }
  }

  /**
   * Updates the CSS custom property for the expanded height of the details element.
   *
   * @param {string} value - The value to set for the expanded height.
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
   *
   * @param {TransitionEvent} event - The transitionend event.
   */
  private handleTransitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === 'height' && this.expanded) {
      this.updateExpandedHeightProperty('auto')
    }
  }

  /**
   * Toggles the expanded state of the panel.
   * This method is called when the header is clicked, and it schedules an animation frame
   * to either expand or collapse the panel based on its current state.
   * If an animation frame is already scheduled, it cancels the pending frame before scheduling a new one.
   */
  private toggleExpanded = (): void => {
    if (this.expanded && this.collapsible) {
      this.collapse()
    } else {
      this.expand()
    }
  }

  /**
   * Expands the panel to show the content.
   * This method updates the CSS custom property for the expanded height
   * and emits the uiExpansionPanelToggle event with the current state and element reference.
   * It also sets the expanded property to true.
   *
   * @returns {Promise<void>} A promise that resolves once the panel is expanded.
   */
  @Method()
  async expand(): Promise<void> {
    this.updateExpandedHeightProperty(`${this.detailsScrollHeight}px`)
    this.expanded = true
    this.uiExpansionPanelExpand.emit({
      element: this.element,
      id: this._id,
      data: this.dataValue,
    })
  }

  /**
   * Collapses the panel to hide the content.
   * This method updates the CSS custom property for the expanded height to 0px,
   * schedules an animation frame to apply the height change, and sets the expanded property to false.
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
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div class="header" onClick={this.toggleExpanded}>
          <slot name="header" />
        </div>
        <div class="details" ref={(element) => (this.detailsElement = element)}>
          <div class="content">
            <slot name="content" />
          </div>
        </div>
      </Host>
    )
  }
}
