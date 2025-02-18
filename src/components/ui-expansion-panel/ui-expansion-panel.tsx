import { Component, Host, Element, Prop, h } from '@stencil/core'

/**
 * @component UIExpansionPanel
 * @description A custom web component that provides an expandable/collapsible panel.
 * The panel consists of a header and a details section. The details section can be expanded or collapsed by clicking on the header.
 */
@Component({
  tag: 'ui-expansion-panel',
  styleUrl: 'ui-expansion-panel.css',
  shadow: true,
})
export class UIExpansionPanel {
  private detailsElement!: HTMLDivElement
  private detailsScrollHeight: number = 0

  /**
   * Reference to the host element.
   */
  @Element() element: HTMLUiExpansionPanelElement

  /**
   * Indicates whether the panel is expanded or collapsed.
   * @type {boolean}
   * @default false
   */
  @Prop({reflect: true, mutable: true}) expanded: boolean = false

  /**
   * Lifecycle method that is called once the component has loaded.
   * Sets up a ResizeObserver to monitor changes in the details section's height.
   */
  componentDidLoad() {
    const resizeObserver = new ResizeObserver(() => {
      this.updateDetailsScrollHeight()
    })

    resizeObserver.observe(this.detailsElement)
  }

  /**
   * Calculates and updates the scroll height of the details section.
   * If the height has changed, it updates the CSS variable for the expanded height.
   */
  private updateDetailsScrollHeight(): void {
    const observedDetailsScrollHeight = this.detailsElement.scrollHeight

    if (observedDetailsScrollHeight !== this.detailsScrollHeight) {
      this.detailsScrollHeight = observedDetailsScrollHeight
      this.updateExpandedHeightProperty(`${this.detailsScrollHeight}px`)
    }
  }

  /**
   * Updates the CSS variable for the expanded height of the details section.
   * @param {string} value - The new height value to set.
   */
  private updateExpandedHeightProperty(value: string): void {
    const styleSheets = this.element.shadowRoot.adoptedStyleSheets
      ? this.element.shadowRoot.adoptedStyleSheets
      : this.element.shadowRoot.styleSheets

    if (styleSheets instanceof StyleSheetList) {
      styleSheets[0].insertRule(`:host {--UI-Expansion-Panel-Details-Expanded-Height: ${value}}`)
    } else {
      const styleSheetAddition = new CSSStyleSheet()
      styleSheetAddition.replaceSync(
        `:host {--UI-Expansion-Panel-Details-Expanded-Height: ${value}}`,
      )
      this.element.shadowRoot.adoptedStyleSheets = [...styleSheets, styleSheetAddition]
    }
  }

  /**
   * Toggles the expanded state of the panel.
   */
  private toggleExpanded(): void {
    this.expanded = !this.expanded
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div class="header" onClick={() => this.toggleExpanded()}>
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
