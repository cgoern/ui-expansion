# ui-expansion-panel

<!-- Auto Generated Below -->

## Overview

A custom expansion panel component that can expand and collapse to show or hide content.

## Usage

### Ui-expansion-panel-usage

# How to use `ui-expansion-panel`

```html
<ui-expansion-panel>
  <div slot="header">UI Expansion Panel Header</div>
  <div slot="content">
    Incidunt enim voluptatem ab officiis et dolorem officia ea. Officia necessitatibus molestiae
    beatae et iste sed. Dolore sint in consequatur similique eos est. Magnam in amet suscipit ea
    eaque sed quidem. Autem corporis libero quasi recusandae omnis.
  </div>
</ui-expansion-panel>
```

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                   | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `_id`      | `_id`      | A unique identifier for the expansion panel. This property can be used to distinguish between multiple expansion panels in the same context, allowing for better management and control of individual panels. | `string`  | `undefined` |
| `expanded` | `expanded` | Determines whether the panel is expanded or collapsed.                                                                                                                                                        | `boolean` | `false`     |

## Events

| Event                    | Description                                                                                                                                                                                    | Type                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `uiExpansionPanelToggle` | Event emitted when the expansion panel is toggled. This event is fired whenever the panel is expanded or collapsed, providing the current expanded state and a reference to the panel element. | `CustomEvent<{ expanded: boolean; element: HTMLUiExpansionPanelElement; id?: string; }>` |

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
