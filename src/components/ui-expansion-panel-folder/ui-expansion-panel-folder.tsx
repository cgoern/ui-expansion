import { Component, Host, Element, Listen, h } from '@stencil/core'
import { UiExpansionPanelExpandEventDetails } from './../../types'

@Component({
  tag: 'ui-expansion-panel-folder',
  styleUrl: 'ui-expansion-panel-folder.css',
  shadow: true,
})
export class UiExpansionPanelFolder {
  /**
   * An array of HTMLUiExpansionPanelElement that represents the panels within the folder.
   * This property is used to keep track of all the expansion panels contained in the folder
   * and to manage their state, such as collapsing other panels when one is expanded.
   */
  private panels: HTMLUiExpansionPanelElement[] = []

  /**
   * The host element of the component.
   * This property is automatically populated by Stencil and provides a reference
   * to the custom element instance. It can be used to access the element's
   * shadow DOM, attributes, and other properties.
   */
  @Element() element!: HTMLUiExpansionPanelFolderElement

  /**
   * Event listener for the 'uiExpansionPanelExpand' event.
   * This method is triggered whenever an expansion panel within the folder is expanded.
   * It collapses all other panels except the one that triggered the event.
   *
   * @param event - The custom event containing details about the expanded panel.
   */
  @Listen('uiExpansionPanelExpand')
  async listenUiExpansionPanelExpand(event: CustomEvent<UiExpansionPanelExpandEventDetails>) {
    const collapsablePanels = this.panels.filter((panel) => panel !== event.detail.element)

    await Promise.all(collapsablePanels.map((panel) => panel.collapse()))
  }

  /**
   * Lifecycle method that is called when the component is about to be loaded.
   * This method initializes the `panels` property by selecting all `ui-expansion-panel`
   * elements within the host element. It ensures that the component has a reference
   * to all the expansion panels contained within it before it is rendered.
   */
  componentWillLoad() {
    this.panels = Array.from(this.element.querySelectorAll('ui-expansion-panel'))
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
