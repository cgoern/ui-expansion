import { Component, Host, Element, Listen, h } from '@stencil/core'
import { UiExpansionPanelDetails } from './../../types'

/**
 * A custom expansion folder component that wraps multiple expansion panels.
 *
 * @slot - Content is placed in the host element.
 */
@Component({
  tag: 'ui-expansion-folder',
  styleUrl: 'ui-expansion-folder.css',
  shadow: true,
})
export class UiExpansionFolder {
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
  @Element() element!: HTMLUiExpansionFolderElement

  /**
   * Event listener for the 'uiExpansionPanelToggle' event.
   * This method is triggered whenever an expansion panel within the folder is toggled.
   * It collapses all other panels except the one that was toggled.
   *
   * @param event - The custom event containing details about the toggled panel.
   * @returns A promise that resolves when all other panels have been collapsed.
   */
  @Listen('uiExpansionPanelToggle')
  async listenUiExpansionPanelToggle(event: CustomEvent<UiExpansionPanelDetails>): Promise<void> {
    const collapsiblePanels = this.panels.filter((panel) => panel !== event.detail.element)

    try {
      await Promise.all(collapsiblePanels.map((panel) => panel.collapse()))
    } catch (error) {
      console.error('Error collapsing panels:', error)
    }
  }

  /**
   * Lifecycle method that is called once just after the component has fully loaded and rendered.
   * It is used to initialize the panels array and set the collapsible property of each panel.
   */
  componentDidLoad() {
    this.panels = Array.from(this.element.querySelectorAll('ui-expansion-panel'))
    this.panels.forEach((panel) => {
      panel.collapsible = false
    })
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
