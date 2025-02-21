# ui-expansion-folder

<!-- Auto Generated Below -->

## Overview

A custom expansion folder component that wraps multiple expansion panels.

## Usage

### Ui-expansion-folder-usage

# How to use `ui-expansion-folder`

```html
<ui-expansion-folder>
  <ui-expansion-panel expanded data='{"product": 1, "name": "Product Name 1"}'>
    <div slot="summary">UI Expansion Panel 1</div>
    <div slot="details">
      Recusandae quod aspernatur vitae ut adipisci ut. Et quas nulla optio nemo aut consequuntur
      excepturi nulla. Fuga voluptate aperiam odio consectetur aliquid itaque incidunt quos.
      Expedita iste vero molestiae fugiat sit velit qui. Ratione eligendi et eaque eum numquam quia
      laborum. Aut ea non atque qui ex accusantium.
    </div>
  </ui-expansion-panel>
  <ui-expansion-panel data='{"product": 2, "name": "Product Name 2"}'>
    <div slot="summary">UI Expansion Panel 2</div>
    <div slot="details">
      Cum rerum ullam consequuntur non repudiandae ipsa eius eius. Quae error sequi ipsum cum
      deleniti mollitia quia velit. Dolorem dolorem distinctio sit qui modi tempora quis quia.
    </div>
  </ui-expansion-panel>
  <!-- ... -->
</ui-expansion-folder>
```

## Slots

| Slot | Description                            |
| ---- | -------------------------------------- |
|      | Content is placed in the host element. |

## CSS Custom Properties

| Name                                  | Description                            |
| ------------------------------------- | -------------------------------------- |
| `--UI-Expansion-Folder-Display`       | Display of the expansion panel.        |
| `--UI-Expansion-Folder-FlexDirection` | Flex direction of the expansion panel. |
| `--UI-Expansion-Folder-Gap`           | Gap between the expansion panel items. |

---

©2025 cgoern
