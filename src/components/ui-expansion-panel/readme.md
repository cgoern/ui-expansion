# ui-expansion-panel

<!-- Auto Generated Below -->

## Overview

A custom expansion panel component that can expand and collapse to show or hide details.

## Usage

### Ui-expansion-panel-usage

# How to use `ui-expansion-panel`

```html
<ui-expansion-panel expanded data='{"product": 1, "name": "Product Name 1"}'>
  <div slot="summary">UI Expansion Panel 1</div>
  <div slot="details">
    Recusandae quod aspernatur vitae ut adipisci ut. Et quas nulla optio nemo aut consequuntur
    excepturi nulla. Fuga voluptate aperiam odio consectetur aliquid itaque incidunt quos. Expedita
    iste vero molestiae fugiat sit velit qui. Ratione eligendi et eaque eum numquam quia laborum.
    Aut ea non atque qui ex accusantium.
  </div>
</ui-expansion-panel>
```

## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                                                                                                      | Type      | Default |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `collapsible` | `collapsible` | Determines whether the panel can be collapsed by clicking on its summary. If set to false, the panel will not collapse when the summary is clicked. This property is useful when you want to enforce that the panel remains expanded until another panel is expanded, typically used in conjunction with a parent component that manages the expansion state of multiple panels. | `boolean` | `true`  |
| `data`        | `data`        | Data to be used within the expansion panel. This property can be used to pass any data that needs to be accessed or displayed within the expansion panel. The data can be of any type and is parsed from a JSON string if provided as such.                                                                                                                                      | `string`  | `null`  |
| `expanded`    | `expanded`    | Determines whether the panel is expanded or collapsed.                                                                                                                                                                                                                                                                                                                           | `boolean` | `false` |

## Events

| Event                    | Description                                                                                                                                                                                                                                                                                       | Type                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `uiExpansionPanelToggle` | Event emitted when the expansion panel is toggled. This event is triggered whenever the panel is expanded or collapsed, providing details about the current state of the panel, including a reference to the element, the expanded state, the panel's unique identifier, and any associated data. | `CustomEvent<{ element: HTMLUiExpansionPanelElement; expanded: boolean; data: unknown; }>` |

## Methods

### `collapse() => Promise<void>`

Collapses the panel to hide the details.
This method updates the CSS custom property for the expanded height to 0px,
schedules an animation frame to apply the height change, and sets the expanded property to false.
It ensures that the panel transitions smoothly to its collapsed state, making the details content
hidden. The method returns a promise that resolves once the panel is collapsed.

#### Returns

Type: `Promise<void>`

A promise that resolves once the panel is collapsed.

### `expand() => Promise<void>`

Expands the panel to show the details.
This method updates the CSS custom property for the expanded height
and sets the expanded property to true. It ensures that the panel
transitions smoothly to its expanded state, making the details content
fully visible. The method returns a promise that resolves once the
panel is expanded.

#### Returns

Type: `Promise<void>`

A promise that resolves once the panel is expanded.

### `getData() => Promise<unknown | null>`

Retrieves the data associated with the expansion panel.
This method returns the \_data property, which contains any additional information
or metadata that has been associated with the expansion panel.
It provides a way to access the contextual information or state that is relevant
to the panel's details or behavior.

#### Returns

Type: `Promise<unknown>`

A promise that resolves to the data associated with the panel,
or null if no data is available.

### `toggle() => Promise<void>`

Toggles the expanded state of the panel.
This method is called when the summary is clicked, and it schedules an animation frame
to either expand or collapse the panel based on its current state.
If an animation frame is already scheduled, it cancels the pending frame before scheduling a new one.
It also emits the uiExpansionPanelToggle event with the current state and element reference.

#### Returns

Type: `Promise<void>`

A promise that resolves when the panel has been toggled.

## Slots

| Slot        | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `"details"` | Content is placed in the details area which is expanded or collapsed. |
| `"summary"` | Content is placed in the summary which toggles the expansion state.   |

## Shadow Parts

| Part        | Description                              |
| ----------- | ---------------------------------------- |
| `"details"` | The details area of the expansion panel. |
| `"summary"` | The summary area of the expansion panel. |

## CSS Custom Properties

| Name                                            | Description                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--UI-Expansion-Panel-Background`               | Background of the expansion panel.                                                   |
| `--UI-Expansion-Panel-BorderRadius`             | Border radius of the expansion panel.                                                |
| `--UI-Expansion-Panel-BoxShadow`                | Box shadow of the expansion panel.                                                   |
| `--UI-Expansion-Panel-Expanded-Background`      | Background color of the expansion panel when expanded.                               |
| `--UI-Expansion-Panel-Expanded-BoxShadow`       | Box shadow of the expansion panel when expanded.                                     |
| `--UI-Expansion-Panel-Expanded-Summary-Cursor`  | Cursor of the summary element when expanded.                                         |
| `--UI-Expansion-Panel-Hover-Background`         | Background color of the expansion panel when hovered.                                |
| `--UI-Expansion-Panel-Summary-Cursor`           | Cursor of the summary element.                                                       |
| `--UI-Expansion-Panel-TransitionDuration`       | Duration of the transition effect when expanding or collapsing the panel.            |
| `--UI-Expansion-Panel-TransitionProperty`       | Transition property of the transition effect when expanding or collapsing the panel. |
| `--UI-Expansion-Panel-TransitionTimingFunction` | Timing function of the transition effect when expanding or collapsing the panel.     |

---

©2025 cgoern
