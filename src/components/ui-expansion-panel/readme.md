# ui-expansion-panel

<!-- Auto Generated Below -->

## Overview

A custom expansion panel component that can expand and collapse to show or hide content.

## Usage

### Ui-expansion-panel-usage

# How to use `ui-expansion-panel`

```html
<ui-expansion-panel _id="123" _data='{"product": 12345, "name": "Product Name", "quantity": 10}'>
  <div slot="header">UI Expansion Panel Header</div>
  <div slot="content">
    Incidunt enim voluptatem ab officiis et dolorem officia ea. Officia necessitatibus molestiae
    beatae et iste sed. Dolore sint in consequatur similique eos est. Magnam in amet suscipit ea
    eaque sed quidem. Autem corporis libero quasi recusandae omnis.
  </div>
</ui-expansion-panel>
```

## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                                                                                                    | Type      | Default |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- |
| `_data`       | `_data`       | Data to be used within the expansion panel. This property can be used to pass any data that needs to be accessed or displayed within the expansion panel. The data can be of any type and is parsed from a JSON string if provided as such.                                                                                                                                    | `string`  | `null`  |
| `_id`         | `_id`         | A unique identifier for the expansion panel. This property can be used to distinguish between multiple expansion panels in the same context, allowing for better management and control of individual panels.                                                                                                                                                                  | `string`  | `null`  |
| `collapsible` | `collapsible` | Determines whether the panel can be collapsed by clicking on its header. If set to false, the panel will not collapse when the header is clicked. This property is useful when you want to enforce that the panel remains expanded until another panel is expanded, typically used in conjunction with a parent component that manages the expansion state of multiple panels. | `boolean` | `true`  |
| `expanded`    | `expanded`    | Determines whether the panel is expanded or collapsed.                                                                                                                                                                                                                                                                                                                         | `boolean` | `false` |

## Events

| Event                    | Description                                                                                                                                                                                                                                           | Type                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `uiExpansionPanelExpand` | Event emitted when the panel is expanded. This event is triggered whenever the panel is expanded, providing details about the panel's state. The event detail contains the element reference, the panel's unique identifier, and any associated data. | `CustomEvent<{ element: HTMLUiExpansionPanelElement; id?: string; data?: object; }>` |

## Methods

### `collapse() => Promise<void>`

Collapses the panel to hide the content.
This method updates the CSS custom property for the expanded height to 0px,
schedules an animation frame to apply the height change, and sets the expanded property to false.

#### Returns

Type: `Promise<void>`

A promise that resolves once the panel is collapsed.

### `expand() => Promise<void>`

Expands the panel to show the content.
This method updates the CSS custom property for the expanded height
and emits the uiExpansionPanelToggle event with the current state and element reference.
It also sets the expanded property to true.

#### Returns

Type: `Promise<void>`

A promise that resolves once the panel is expanded.

## Slots

| Slot        | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `"content"` | Content is placed in the content area which is expanded or collapsed. |
| `"header"`  | Content is placed in the header which toggles the expansion state.    |

## CSS Custom Properties

| Name                                            | Description                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--UI-Expansion-Panel-Background`               | Background of the expansion panel.                                                   |
| `--UI-Expansion-Panel-BorderRadius`             | Border radius of the expansion panel.                                                |
| `--UI-Expansion-Panel-BoxShadow`                | Box shadow of the expansion panel.                                                   |
| `--UI-Expansion-Panel-Details-BoxShadow`        | Box shadow of the expansion panel details.                                           |
| `--UI-Expansion-Panel-Expanded-Background`      | Background color of the expansion panel when expanded.                               |
| `--UI-Expansion-Panel-Expanded-BoxShadow`       | Box shadow of the expansion panel when expanded.                                     |
| `--UI-Expansion-Panel-TransitionDuration`       | Duration of the transition effect when expanding or collapsing the panel.            |
| `--UI-Expansion-Panel-TransitionProperty`       | Transition property of the transition effect when expanding or collapsing the panel. |
| `--UI-Expansion-Panel-TransitionTimingFunction` | Timing function of the transition effect when expanding or collapsing the panel.     |

---

©2025 cgoern
