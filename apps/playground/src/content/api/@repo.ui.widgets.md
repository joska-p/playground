---
title: widgets
package: "@repo/ui"
kind: module
module: widgets
---

## Modules

- [\<internal\>](@repo.ui.widgets.<internal>.md)

## Interfaces

### ColorPaletteProps

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L9)

Construct a type with the properties of T except for those in type K.

#### Extends

- [`Omit`](@repo.ui.data-entry.<internal>.md#omit)\<[`LabelHTMLAttributes`](@repo.ui.widgets.<internal>.md#labelhtmlattributes)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>, `"onChange"`\>.[`ColorPaletteVariants`](@repo.ui.widgets.<internal>.md#colorpalettevariants)

#### Properties

##### about?

> `optional` **about?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2820

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`about`](@repo.ui.data-entry.<internal>.md#about)

##### accessKey?

> `optional` **accessKey?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2793

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`accessKey`](@repo.ui.data-entry.<internal>.md#accesskey)

##### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2491

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-activedescendant`](@repo.ui.data-entry.<internal>.md#aria-activedescendant)

##### aria-atomic?

> `optional` **aria-atomic?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2493

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-atomic`](@repo.ui.data-entry.<internal>.md#aria-atomic)

##### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2498

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-autocomplete`](@repo.ui.data-entry.<internal>.md#aria-autocomplete)

##### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2504

Defines a string value that labels the current element, which is intended to be converted into Braille.

###### See

aria-label.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-braillelabel`](@repo.ui.data-entry.<internal>.md#aria-braillelabel)

##### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2509

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

###### See

aria-roledescription.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-brailleroledescription`](@repo.ui.data-entry.<internal>.md#aria-brailleroledescription)

##### aria-busy?

> `optional` **aria-busy?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2510

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-busy`](@repo.ui.data-entry.<internal>.md#aria-busy)

##### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2515

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

###### See

 - aria-pressed
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-checked`](@repo.ui.data-entry.<internal>.md#aria-checked)

##### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2520

Defines the total number of columns in a table, grid, or treegrid.

###### See

aria-colindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colcount`](@repo.ui.data-entry.<internal>.md#aria-colcount)

##### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2525

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

###### See

 - aria-colcount
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindex`](@repo.ui.data-entry.<internal>.md#aria-colindex)

##### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2530

Defines a human readable text alternative of aria-colindex.

###### See

aria-rowindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindextext`](@repo.ui.data-entry.<internal>.md#aria-colindextext)

##### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2535

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-colindex
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colspan`](@repo.ui.data-entry.<internal>.md#aria-colspan)

##### aria-controls?

> `optional` **aria-controls?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2540

Identifies the element (or elements) whose contents or presence are controlled by the current element.

###### See

aria-owns.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-controls`](@repo.ui.data-entry.<internal>.md#aria-controls)

##### aria-current?

> `optional` **aria-current?**: `boolean` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"location"` \| `"date"` \| `"time"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2542

Indicates the element that represents the current item within a container or set of related elements.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-current`](@repo.ui.data-entry.<internal>.md#aria-current)

##### aria-describedby?

> `optional` **aria-describedby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2547

Identifies the element (or elements) that describes the object.

###### See

aria-labelledby

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-describedby`](@repo.ui.data-entry.<internal>.md#aria-describedby)

##### aria-description?

> `optional` **aria-description?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2552

Defines a string value that describes or annotates the current element.

###### See

related aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-description`](@repo.ui.data-entry.<internal>.md#aria-description)

##### aria-details?

> `optional` **aria-details?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2557

Identifies the element that provides a detailed, extended description for the object.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-details`](@repo.ui.data-entry.<internal>.md#aria-details)

##### aria-disabled?

> `optional` **aria-disabled?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2562

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

###### See

 - aria-hidden
 - aria-readonly.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-disabled`](@repo.ui.data-entry.<internal>.md#aria-disabled)

##### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"link"` \| `"none"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2567

Indicates what functions can be performed when a dragged object is released on the drop target.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-dropeffect`](@repo.ui.data-entry.<internal>.md#aria-dropeffect)

##### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2572

Identifies the element that provides an error message for the object.

###### See

 - aria-invalid
 - aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-errormessage`](@repo.ui.data-entry.<internal>.md#aria-errormessage)

##### aria-expanded?

> `optional` **aria-expanded?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2574

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-expanded`](@repo.ui.data-entry.<internal>.md#aria-expanded)

##### aria-flowto?

> `optional` **aria-flowto?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2579

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-flowto`](@repo.ui.data-entry.<internal>.md#aria-flowto)

##### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2584

Indicates an element's "grabbed" state in a drag-and-drop operation.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-grabbed`](@repo.ui.data-entry.<internal>.md#aria-grabbed)

##### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"true"` \| `"false"` \| `"dialog"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2586

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-haspopup`](@repo.ui.data-entry.<internal>.md#aria-haspopup)

##### aria-hidden?

> `optional` **aria-hidden?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2591

Indicates whether the element is exposed to an accessibility API.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-hidden`](@repo.ui.data-entry.<internal>.md#aria-hidden)

##### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2596

Indicates the entered value does not conform to the format expected by the application.

###### See

aria-errormessage.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-invalid`](@repo.ui.data-entry.<internal>.md#aria-invalid)

##### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2598

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-keyshortcuts`](@repo.ui.data-entry.<internal>.md#aria-keyshortcuts)

##### aria-label?

> `optional` **aria-label?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2603

Defines a string value that labels the current element.

###### See

aria-labelledby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-label`](@repo.ui.data-entry.<internal>.md#aria-label)

##### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2608

Identifies the element (or elements) that labels the current element.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-labelledby`](@repo.ui.data-entry.<internal>.md#aria-labelledby)

##### aria-level?

> `optional` **aria-level?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2610

Defines the hierarchical level of an element within a structure.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-level`](@repo.ui.data-entry.<internal>.md#aria-level)

##### aria-live?

> `optional` **aria-live?**: `"off"` \| `"assertive"` \| `"polite"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2612

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-live`](@repo.ui.data-entry.<internal>.md#aria-live)

##### aria-modal?

> `optional` **aria-modal?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2614

Indicates whether an element is modal when displayed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-modal`](@repo.ui.data-entry.<internal>.md#aria-modal)

##### aria-multiline?

> `optional` **aria-multiline?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2616

Indicates whether a text box accepts multiple lines of input or only a single line.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiline`](@repo.ui.data-entry.<internal>.md#aria-multiline)

##### aria-multiselectable?

> `optional` **aria-multiselectable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2618

Indicates that the user may select more than one item from the current selectable descendants.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiselectable`](@repo.ui.data-entry.<internal>.md#aria-multiselectable)

##### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2620

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-orientation`](@repo.ui.data-entry.<internal>.md#aria-orientation)

##### aria-owns?

> `optional` **aria-owns?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2626

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

###### See

aria-controls.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-owns`](@repo.ui.data-entry.<internal>.md#aria-owns)

##### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2631

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-placeholder`](@repo.ui.data-entry.<internal>.md#aria-placeholder)

##### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2636

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-setsize.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-posinset`](@repo.ui.data-entry.<internal>.md#aria-posinset)

##### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2641

Indicates the current "pressed" state of toggle buttons.

###### See

 - aria-checked
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-pressed`](@repo.ui.data-entry.<internal>.md#aria-pressed)

##### aria-readonly?

> `optional` **aria-readonly?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2646

Indicates that the element is not editable, but is otherwise operable.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-readonly`](@repo.ui.data-entry.<internal>.md#aria-readonly)

##### aria-relevant?

> `optional` **aria-relevant?**: `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2651

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

###### See

aria-atomic.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-relevant`](@repo.ui.data-entry.<internal>.md#aria-relevant)

##### aria-required?

> `optional` **aria-required?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2664

Indicates that user input is required on the element before a form may be submitted.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-required`](@repo.ui.data-entry.<internal>.md#aria-required)

##### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2666

Defines a human-readable, author-localized description for the role of an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-roledescription`](@repo.ui.data-entry.<internal>.md#aria-roledescription)

##### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2671

Defines the total number of rows in a table, grid, or treegrid.

###### See

aria-rowindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowcount`](@repo.ui.data-entry.<internal>.md#aria-rowcount)

##### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2676

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

###### See

 - aria-rowcount
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindex`](@repo.ui.data-entry.<internal>.md#aria-rowindex)

##### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2681

Defines a human readable text alternative of aria-rowindex.

###### See

aria-colindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindextext`](@repo.ui.data-entry.<internal>.md#aria-rowindextext)

##### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2686

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-rowindex
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowspan`](@repo.ui.data-entry.<internal>.md#aria-rowspan)

##### aria-selected?

> `optional` **aria-selected?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2691

Indicates the current "selected" state of various widgets.

###### See

 - aria-checked
 - aria-pressed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-selected`](@repo.ui.data-entry.<internal>.md#aria-selected)

##### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2696

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-posinset.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-setsize`](@repo.ui.data-entry.<internal>.md#aria-setsize)

##### aria-sort?

> `optional` **aria-sort?**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2698

Indicates if items in a table or grid are sorted in ascending or descending order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-sort`](@repo.ui.data-entry.<internal>.md#aria-sort)

##### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2700

Defines the maximum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemax`](@repo.ui.data-entry.<internal>.md#aria-valuemax)

##### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2702

Defines the minimum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemin`](@repo.ui.data-entry.<internal>.md#aria-valuemin)

##### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2707

Defines the current value for a range widget.

###### See

aria-valuetext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuenow`](@repo.ui.data-entry.<internal>.md#aria-valuenow)

##### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2709

Defines the human readable text alternative of aria-valuenow for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuetext`](@repo.ui.data-entry.<internal>.md#aria-valuetext)

##### autoCapitalize?

> `optional` **autoCapitalize?**: `"off"` \| `"none"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"` \| `string` & `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2794

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCapitalize`](@repo.ui.data-entry.<internal>.md#autocapitalize)

##### autoCorrect?

> `optional` **autoCorrect?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2833

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCorrect`](@repo.ui.data-entry.<internal>.md#autocorrect)

##### autoFocus?

> `optional` **autoFocus?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2795

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoFocus`](@repo.ui.data-entry.<internal>.md#autofocus)

##### autoSave?

> `optional` **autoSave?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2834

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoSave`](@repo.ui.data-entry.<internal>.md#autosave)

##### checked?

> `optional` **checked?**: `boolean`

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L14)

##### children?

> `optional` **children?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2267

###### Inherited from

`Omit.children`

##### className?

> `optional` **className?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2796

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`className`](@repo.ui.data-entry.<internal>.md#classname)

##### color?

> `optional` **color?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2835

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`color`](@repo.ui.data-entry.<internal>.md#color-1)

##### colors

> **colors**: `string`[]

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L11)

##### content?

> `optional` **content?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2821

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`content`](@repo.ui.data-entry.<internal>.md#content-1)

##### contentEditable?

> `optional` **contentEditable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish) \| `"inherit"` \| `"plaintext-only"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2797

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contentEditable`](@repo.ui.data-entry.<internal>.md#contenteditable)

##### contextMenu?

> `optional` **contextMenu?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2798

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contextMenu`](@repo.ui.data-entry.<internal>.md#contextmenu)

##### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2268

###### \_\_html

> **\_\_html**: `string` \| [`TrustedHTML`](@repo.ui.data-entry.<internal>.md#trustedhtml)

###### Inherited from

`Omit.dangerouslySetInnerHTML`

##### datatype?

> `optional` **datatype?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2822

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`datatype`](@repo.ui.data-entry.<internal>.md#datatype)

##### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2787

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultChecked`](@repo.ui.data-entry.<internal>.md#defaultchecked)

##### defaultValue?

> `optional` **defaultValue?**: `string` \| `number` \| readonly `string`[]

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2788

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultValue`](@repo.ui.data-entry.<internal>.md#defaultvalue)

##### dir?

> `optional` **dir?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2799

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`dir`](@repo.ui.data-entry.<internal>.md#dir)

##### draggable?

> `optional` **draggable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2800

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`draggable`](@repo.ui.data-entry.<internal>.md#draggable)

##### enterKeyHint?

> `optional` **enterKeyHint?**: `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2801

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`enterKeyHint`](@repo.ui.data-entry.<internal>.md#enterkeyhint)

##### exportparts?

> `optional` **exportparts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2868

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`exportparts`](@repo.ui.cards.<internal>.md#exportparts-44)

##### form?

> `optional` **form?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:3330

###### Inherited from

[`LabelHTMLAttributes`](@repo.ui.widgets.<internal>.md#labelhtmlattributes).[`form`](@repo.ui.widgets.<internal>.md#form-1)

##### hidden?

> `optional` **hidden?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2802

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`hidden`](@repo.ui.data-entry.<internal>.md#hidden)

##### htmlFor?

> `optional` **htmlFor?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:3331

###### Inherited from

[`LabelHTMLAttributes`](@repo.ui.widgets.<internal>.md#labelhtmlattributes).[`htmlFor`](@repo.ui.widgets.<internal>.md#htmlfor)

##### id?

> `optional` **id?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2803

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`id`](@repo.ui.data-entry.<internal>.md#id)

##### inert?

> `optional` **inert?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2854

###### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inert`](@repo.ui.data-entry.<internal>.md#inert)

##### inlist?

> `optional` **inlist?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2823

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inlist`](@repo.ui.data-entry.<internal>.md#inlist)

##### inputMode?

> `optional` **inputMode?**: `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2859

Hints at the type of data that might be entered by the user while editing the element or its contents

###### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`inputMode`](@repo.ui.cards.<internal>.md#inputmode-55)

##### is?

> `optional` **is?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2864

Specify that a standard HTML element should behave like a defined custom built-in element

###### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`is`](@repo.ui.cards.<internal>.md#is-44)

##### itemID?

> `optional` **itemID?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2839

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemID`](@repo.ui.data-entry.<internal>.md#itemid)

##### itemProp?

> `optional` **itemProp?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2836

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemProp`](@repo.ui.data-entry.<internal>.md#itemprop)

##### itemRef?

> `optional` **itemRef?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2840

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemRef`](@repo.ui.data-entry.<internal>.md#itemref)

##### itemScope?

> `optional` **itemScope?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2837

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemScope`](@repo.ui.data-entry.<internal>.md#itemscope)

##### itemType?

> `optional` **itemType?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2838

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemType`](@repo.ui.data-entry.<internal>.md#itemtype)

##### lang?

> `optional` **lang?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2804

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`lang`](@repo.ui.data-entry.<internal>.md#lang)

##### name?

> `optional` **name?**: `string`

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L12)

##### nonce?

> `optional` **nonce?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2805

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`nonce`](@repo.ui.data-entry.<internal>.md#nonce)

##### onAbort?

> `optional` **onAbort?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2327

###### Inherited from

`Omit.onAbort`

##### onAbortCapture?

> `optional` **onAbortCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2328

###### Inherited from

`Omit.onAbortCapture`

##### onAnimationEnd?

> `optional` **onAnimationEnd?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2457

###### Inherited from

`Omit.onAnimationEnd`

##### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2458

###### Inherited from

`Omit.onAnimationEndCapture`

##### onAnimationIteration?

> `optional` **onAnimationIteration?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2459

###### Inherited from

`Omit.onAnimationIteration`

##### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2460

###### Inherited from

`Omit.onAnimationIterationCapture`

##### onAnimationStart?

> `optional` **onAnimationStart?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2455

###### Inherited from

`Omit.onAnimationStart`

##### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2456

###### Inherited from

`Omit.onAnimationStartCapture`

##### onAuxClick?

> `optional` **onAuxClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2373

###### Inherited from

`Omit.onAuxClick`

##### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2374

###### Inherited from

`Omit.onAuxClickCapture`

##### onBeforeInput?

> `optional` **onBeforeInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2299

###### Inherited from

`Omit.onBeforeInput`

##### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2300

###### Inherited from

`Omit.onBeforeInputCapture`

##### onBeforeToggle?

> `optional` **onBeforeToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2464

###### Inherited from

`Omit.onBeforeToggle`

##### onBlur?

> `optional` **onBlur?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2293

###### Inherited from

`Omit.onBlur`

##### onBlurCapture?

> `optional` **onBlurCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2294

###### Inherited from

`Omit.onBlurCapture`

##### onCanPlay?

> `optional` **onCanPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2329

###### Inherited from

`Omit.onCanPlay`

##### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2330

###### Inherited from

`Omit.onCanPlayCapture`

##### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2331

###### Inherited from

`Omit.onCanPlayThrough`

##### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2332

###### Inherited from

`Omit.onCanPlayThroughCapture`

##### onChange?

> `optional` **onChange?**: (`palette`) => `void`

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L15)

###### Parameters

###### palette

`string`

###### Returns

`void`

##### onChangeCapture?

> `optional` **onChangeCapture?**: [`ChangeEventHandler`](@repo.ui.data-entry.<internal>.md#changeeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement), [`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2298

###### Inherited from

`Omit.onChangeCapture`

##### onClick?

> `optional` **onClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2375

###### Inherited from

`Omit.onClick`

##### onClickCapture?

> `optional` **onClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2376

###### Inherited from

`Omit.onClickCapture`

##### onCompositionEnd?

> `optional` **onCompositionEnd?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2283

###### Inherited from

`Omit.onCompositionEnd`

##### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2284

###### Inherited from

`Omit.onCompositionEndCapture`

##### onCompositionStart?

> `optional` **onCompositionStart?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2285

###### Inherited from

`Omit.onCompositionStart`

##### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2286

###### Inherited from

`Omit.onCompositionStartCapture`

##### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2287

###### Inherited from

`Omit.onCompositionUpdate`

##### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2288

###### Inherited from

`Omit.onCompositionUpdateCapture`

##### onContextMenu?

> `optional` **onContextMenu?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2377

###### Inherited from

`Omit.onContextMenu`

##### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2378

###### Inherited from

`Omit.onContextMenuCapture`

##### onCopy?

> `optional` **onCopy?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2275

###### Inherited from

`Omit.onCopy`

##### onCopyCapture?

> `optional` **onCopyCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2276

###### Inherited from

`Omit.onCopyCapture`

##### onCut?

> `optional` **onCut?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2277

###### Inherited from

`Omit.onCut`

##### onCutCapture?

> `optional` **onCutCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2278

###### Inherited from

`Omit.onCutCapture`

##### onDoubleClick?

> `optional` **onDoubleClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2379

###### Inherited from

`Omit.onDoubleClick`

##### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2380

###### Inherited from

`Omit.onDoubleClickCapture`

##### onDrag?

> `optional` **onDrag?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2381

###### Inherited from

`Omit.onDrag`

##### onDragCapture?

> `optional` **onDragCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2382

###### Inherited from

`Omit.onDragCapture`

##### onDragEnd?

> `optional` **onDragEnd?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2383

###### Inherited from

`Omit.onDragEnd`

##### onDragEndCapture?

> `optional` **onDragEndCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2384

###### Inherited from

`Omit.onDragEndCapture`

##### onDragEnter?

> `optional` **onDragEnter?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2385

###### Inherited from

`Omit.onDragEnter`

##### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2386

###### Inherited from

`Omit.onDragEnterCapture`

##### onDragExit?

> `optional` **onDragExit?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2387

###### Inherited from

`Omit.onDragExit`

##### onDragExitCapture?

> `optional` **onDragExitCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2388

###### Inherited from

`Omit.onDragExitCapture`

##### onDragLeave?

> `optional` **onDragLeave?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2389

###### Inherited from

`Omit.onDragLeave`

##### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2390

###### Inherited from

`Omit.onDragLeaveCapture`

##### onDragOver?

> `optional` **onDragOver?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2391

###### Inherited from

`Omit.onDragOver`

##### onDragOverCapture?

> `optional` **onDragOverCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2392

###### Inherited from

`Omit.onDragOverCapture`

##### onDragStart?

> `optional` **onDragStart?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2393

###### Inherited from

`Omit.onDragStart`

##### onDragStartCapture?

> `optional` **onDragStartCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2394

###### Inherited from

`Omit.onDragStartCapture`

##### onDrop?

> `optional` **onDrop?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2395

###### Inherited from

`Omit.onDrop`

##### onDropCapture?

> `optional` **onDropCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2396

###### Inherited from

`Omit.onDropCapture`

##### onDurationChange?

> `optional` **onDurationChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2333

###### Inherited from

`Omit.onDurationChange`

##### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2334

###### Inherited from

`Omit.onDurationChangeCapture`

##### onEmptied?

> `optional` **onEmptied?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2335

###### Inherited from

`Omit.onEmptied`

##### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2336

###### Inherited from

`Omit.onEmptiedCapture`

##### onEncrypted?

> `optional` **onEncrypted?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2337

###### Inherited from

`Omit.onEncrypted`

##### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2338

###### Inherited from

`Omit.onEncryptedCapture`

##### onEnded?

> `optional` **onEnded?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2339

###### Inherited from

`Omit.onEnded`

##### onEndedCapture?

> `optional` **onEndedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2340

###### Inherited from

`Omit.onEndedCapture`

##### onError?

> `optional` **onError?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2313

###### Inherited from

`Omit.onError`

##### onErrorCapture?

> `optional` **onErrorCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2314

###### Inherited from

`Omit.onErrorCapture`

##### onFocus?

> `optional` **onFocus?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2291

###### Inherited from

`Omit.onFocus`

##### onFocusCapture?

> `optional` **onFocusCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2292

###### Inherited from

`Omit.onFocusCapture`

##### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2439

###### Inherited from

`Omit.onGotPointerCapture`

##### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2440

###### Inherited from

`Omit.onGotPointerCaptureCapture`

##### onInput?

> `optional` **onInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2301

###### Inherited from

`Omit.onInput`

##### onInputCapture?

> `optional` **onInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2302

###### Inherited from

`Omit.onInputCapture`

##### onInvalid?

> `optional` **onInvalid?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2307

###### Inherited from

`Omit.onInvalid`

##### onInvalidCapture?

> `optional` **onInvalidCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2308

###### Inherited from

`Omit.onInvalidCapture`

##### onKeyDown?

> `optional` **onKeyDown?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2317

###### Inherited from

`Omit.onKeyDown`

##### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2318

###### Inherited from

`Omit.onKeyDownCapture`

##### ~~onKeyPress?~~

> `optional` **onKeyPress?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2320

###### Deprecated

Use `onKeyUp` or `onKeyDown` instead

###### Inherited from

`Omit.onKeyPress`

##### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2322

###### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

###### Inherited from

`Omit.onKeyPressCapture`

##### onKeyUp?

> `optional` **onKeyUp?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2323

###### Inherited from

`Omit.onKeyUp`

##### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2324

###### Inherited from

`Omit.onKeyUpCapture`

##### onLoad?

> `optional` **onLoad?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2311

###### Inherited from

`Omit.onLoad`

##### onLoadCapture?

> `optional` **onLoadCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2312

###### Inherited from

`Omit.onLoadCapture`

##### onLoadedData?

> `optional` **onLoadedData?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2341

###### Inherited from

`Omit.onLoadedData`

##### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2342

###### Inherited from

`Omit.onLoadedDataCapture`

##### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2343

###### Inherited from

`Omit.onLoadedMetadata`

##### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2344

###### Inherited from

`Omit.onLoadedMetadataCapture`

##### onLoadStart?

> `optional` **onLoadStart?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2345

###### Inherited from

`Omit.onLoadStart`

##### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2346

###### Inherited from

`Omit.onLoadStartCapture`

##### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2441

###### Inherited from

`Omit.onLostPointerCapture`

##### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2442

###### Inherited from

`Omit.onLostPointerCaptureCapture`

##### onMouseDown?

> `optional` **onMouseDown?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2397

###### Inherited from

`Omit.onMouseDown`

##### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2398

###### Inherited from

`Omit.onMouseDownCapture`

##### onMouseEnter?

> `optional` **onMouseEnter?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2399

###### Inherited from

`Omit.onMouseEnter`

##### onMouseLeave?

> `optional` **onMouseLeave?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2400

###### Inherited from

`Omit.onMouseLeave`

##### onMouseMove?

> `optional` **onMouseMove?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2401

###### Inherited from

`Omit.onMouseMove`

##### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2402

###### Inherited from

`Omit.onMouseMoveCapture`

##### onMouseOut?

> `optional` **onMouseOut?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2403

###### Inherited from

`Omit.onMouseOut`

##### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2404

###### Inherited from

`Omit.onMouseOutCapture`

##### onMouseOver?

> `optional` **onMouseOver?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2405

###### Inherited from

`Omit.onMouseOver`

##### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2406

###### Inherited from

`Omit.onMouseOverCapture`

##### onMouseUp?

> `optional` **onMouseUp?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2407

###### Inherited from

`Omit.onMouseUp`

##### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2408

###### Inherited from

`Omit.onMouseUpCapture`

##### onPaste?

> `optional` **onPaste?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2279

###### Inherited from

`Omit.onPaste`

##### onPasteCapture?

> `optional` **onPasteCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2280

###### Inherited from

`Omit.onPasteCapture`

##### onPause?

> `optional` **onPause?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2347

###### Inherited from

`Omit.onPause`

##### onPauseCapture?

> `optional` **onPauseCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2348

###### Inherited from

`Omit.onPauseCapture`

##### onPlay?

> `optional` **onPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2349

###### Inherited from

`Omit.onPlay`

##### onPlayCapture?

> `optional` **onPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2350

###### Inherited from

`Omit.onPlayCapture`

##### onPlaying?

> `optional` **onPlaying?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2351

###### Inherited from

`Omit.onPlaying`

##### onPlayingCapture?

> `optional` **onPlayingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2352

###### Inherited from

`Omit.onPlayingCapture`

##### onPointerCancel?

> `optional` **onPointerCancel?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2431

###### Inherited from

`Omit.onPointerCancel`

##### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2432

###### Inherited from

`Omit.onPointerCancelCapture`

##### onPointerDown?

> `optional` **onPointerDown?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2425

###### Inherited from

`Omit.onPointerDown`

##### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2426

###### Inherited from

`Omit.onPointerDownCapture`

##### onPointerEnter?

> `optional` **onPointerEnter?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2433

###### Inherited from

`Omit.onPointerEnter`

##### onPointerLeave?

> `optional` **onPointerLeave?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2434

###### Inherited from

`Omit.onPointerLeave`

##### onPointerMove?

> `optional` **onPointerMove?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2427

###### Inherited from

`Omit.onPointerMove`

##### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2428

###### Inherited from

`Omit.onPointerMoveCapture`

##### onPointerOut?

> `optional` **onPointerOut?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2437

###### Inherited from

`Omit.onPointerOut`

##### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2438

###### Inherited from

`Omit.onPointerOutCapture`

##### onPointerOver?

> `optional` **onPointerOver?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2435

###### Inherited from

`Omit.onPointerOver`

##### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2436

###### Inherited from

`Omit.onPointerOverCapture`

##### onPointerUp?

> `optional` **onPointerUp?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2429

###### Inherited from

`Omit.onPointerUp`

##### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2430

###### Inherited from

`Omit.onPointerUpCapture`

##### onProgress?

> `optional` **onProgress?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2353

###### Inherited from

`Omit.onProgress`

##### onProgressCapture?

> `optional` **onProgressCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2354

###### Inherited from

`Omit.onProgressCapture`

##### onRateChange?

> `optional` **onRateChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2355

###### Inherited from

`Omit.onRateChange`

##### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2356

###### Inherited from

`Omit.onRateChangeCapture`

##### onReset?

> `optional` **onReset?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2303

###### Inherited from

`Omit.onReset`

##### onResetCapture?

> `optional` **onResetCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2304

###### Inherited from

`Omit.onResetCapture`

##### onScroll?

> `optional` **onScroll?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2445

###### Inherited from

`Omit.onScroll`

##### onScrollCapture?

> `optional` **onScrollCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2446

###### Inherited from

`Omit.onScrollCapture`

##### onScrollEnd?

> `optional` **onScrollEnd?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2447

###### Inherited from

`Omit.onScrollEnd`

##### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2448

###### Inherited from

`Omit.onScrollEndCapture`

##### onSeeked?

> `optional` **onSeeked?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2357

###### Inherited from

`Omit.onSeeked`

##### onSeekedCapture?

> `optional` **onSeekedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2358

###### Inherited from

`Omit.onSeekedCapture`

##### onSeeking?

> `optional` **onSeeking?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2359

###### Inherited from

`Omit.onSeeking`

##### onSeekingCapture?

> `optional` **onSeekingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2360

###### Inherited from

`Omit.onSeekingCapture`

##### onSelect?

> `optional` **onSelect?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2411

###### Inherited from

`Omit.onSelect`

##### onSelectCapture?

> `optional` **onSelectCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2412

###### Inherited from

`Omit.onSelectCapture`

##### onStalled?

> `optional` **onStalled?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2361

###### Inherited from

`Omit.onStalled`

##### onStalledCapture?

> `optional` **onStalledCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2362

###### Inherited from

`Omit.onStalledCapture`

##### onSubmit?

> `optional` **onSubmit?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2305

###### Inherited from

`Omit.onSubmit`

##### onSubmitCapture?

> `optional` **onSubmitCapture?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2306

###### Inherited from

`Omit.onSubmitCapture`

##### onSuspend?

> `optional` **onSuspend?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2363

###### Inherited from

`Omit.onSuspend`

##### onSuspendCapture?

> `optional` **onSuspendCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2364

###### Inherited from

`Omit.onSuspendCapture`

##### onTimeUpdate?

> `optional` **onTimeUpdate?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2365

###### Inherited from

`Omit.onTimeUpdate`

##### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2366

###### Inherited from

`Omit.onTimeUpdateCapture`

##### onToggle?

> `optional` **onToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2463

###### Inherited from

`Omit.onToggle`

##### onTouchCancel?

> `optional` **onTouchCancel?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2415

###### Inherited from

`Omit.onTouchCancel`

##### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2416

###### Inherited from

`Omit.onTouchCancelCapture`

##### onTouchEnd?

> `optional` **onTouchEnd?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2417

###### Inherited from

`Omit.onTouchEnd`

##### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2418

###### Inherited from

`Omit.onTouchEndCapture`

##### onTouchMove?

> `optional` **onTouchMove?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2419

###### Inherited from

`Omit.onTouchMove`

##### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2420

###### Inherited from

`Omit.onTouchMoveCapture`

##### onTouchStart?

> `optional` **onTouchStart?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2421

###### Inherited from

`Omit.onTouchStart`

##### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2422

###### Inherited from

`Omit.onTouchStartCapture`

##### onTransitionCancel?

> `optional` **onTransitionCancel?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2467

###### Inherited from

`Omit.onTransitionCancel`

##### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2468

###### Inherited from

`Omit.onTransitionCancelCapture`

##### onTransitionEnd?

> `optional` **onTransitionEnd?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2469

###### Inherited from

`Omit.onTransitionEnd`

##### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2470

###### Inherited from

`Omit.onTransitionEndCapture`

##### onTransitionRun?

> `optional` **onTransitionRun?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2471

###### Inherited from

`Omit.onTransitionRun`

##### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2472

###### Inherited from

`Omit.onTransitionRunCapture`

##### onTransitionStart?

> `optional` **onTransitionStart?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2473

###### Inherited from

`Omit.onTransitionStart`

##### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2474

###### Inherited from

`Omit.onTransitionStartCapture`

##### onVolumeChange?

> `optional` **onVolumeChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2367

###### Inherited from

`Omit.onVolumeChange`

##### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2368

###### Inherited from

`Omit.onVolumeChangeCapture`

##### onWaiting?

> `optional` **onWaiting?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2369

###### Inherited from

`Omit.onWaiting`

##### onWaitingCapture?

> `optional` **onWaitingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2370

###### Inherited from

`Omit.onWaitingCapture`

##### onWheel?

> `optional` **onWheel?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2451

###### Inherited from

`Omit.onWheel`

##### onWheelCapture?

> `optional` **onWheelCapture?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2452

###### Inherited from

`Omit.onWheelCapture`

##### orientation?

> `optional` **orientation?**: `"horizontal"` \| `"vertical"` \| `null`

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L16)

###### Overrides

`ColorPaletteVariants.orientation`

##### part?

> `optional` **part?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2872

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`part`](@repo.ui.cards.<internal>.md#part-70)

##### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"manual"` \| `"hint"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2846

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popover`](@repo.ui.data-entry.<internal>.md#popover)

##### popoverTarget?

> `optional` **popoverTarget?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2848

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTarget`](@repo.ui.data-entry.<internal>.md#popovertarget)

##### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"toggle"` \| `"show"` \| `"hide"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2847

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTargetAction`](@repo.ui.data-entry.<internal>.md#popovertargetaction)

##### prefix?

> `optional` **prefix?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2824

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`prefix`](@repo.ui.data-entry.<internal>.md#prefix)

##### property?

> `optional` **property?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2825

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`property`](@repo.ui.data-entry.<internal>.md#property)

##### radioGroup?

> `optional` **radioGroup?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2814

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`radioGroup`](@repo.ui.data-entry.<internal>.md#radiogroup)

##### ref?

> `optional` **ref?**: [`Ref`](@repo.ui.cards.<internal>.md#ref-5)\<[`HTMLLabelElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmllabelelement)\>

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L18)

##### rel?

> `optional` **rel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2826

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rel`](@repo.ui.data-entry.<internal>.md#rel)

##### resource?

> `optional` **resource?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2827

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`resource`](@repo.ui.data-entry.<internal>.md#resource)

##### results?

> `optional` **results?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2841

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`results`](@repo.ui.data-entry.<internal>.md#results)

##### rev?

> `optional` **rev?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2828

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rev`](@repo.ui.data-entry.<internal>.md#rev)

##### role?

> `optional` **role?**: [`AriaRole`](@repo.ui.data-entry.<internal>.md#ariarole)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2817

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`role`](@repo.ui.data-entry.<internal>.md#role)

##### security?

> `optional` **security?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2842

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`security`](@repo.ui.data-entry.<internal>.md#security)

##### size?

> `optional` **size?**: `"sm"` \| `"md"` \| `"lg"` \| `null`

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L17)

##### slot?

> `optional` **slot?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2806

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`slot`](@repo.ui.data-entry.<internal>.md#slot)

##### spellCheck?

> `optional` **spellCheck?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2807

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`spellCheck`](@repo.ui.data-entry.<internal>.md#spellcheck)

##### style?

> `optional` **style?**: [`CSSProperties`](@repo.ui.data-entry.<internal>.md#cssproperties)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2808

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`style`](@repo.ui.data-entry.<internal>.md#style)

##### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2789

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressContentEditableWarning`](@repo.ui.data-entry.<internal>.md#suppresscontenteditablewarning)

##### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2790

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressHydrationWarning`](@repo.ui.data-entry.<internal>.md#suppresshydrationwarning)

##### tabIndex?

> `optional` **tabIndex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2809

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`tabIndex`](@repo.ui.data-entry.<internal>.md#tabindex)

##### title?

> `optional` **title?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2810

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`title`](@repo.ui.data-entry.<internal>.md#title)

##### translate?

> `optional` **translate?**: `"yes"` \| `"no"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2811

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`translate`](@repo.ui.data-entry.<internal>.md#translate-1)

##### typeof?

> `optional` **typeof?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2829

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`typeof`](@repo.ui.data-entry.<internal>.md#typeof-2)

##### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2843

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`unselectable`](@repo.ui.data-entry.<internal>.md#unselectable)

##### value?

> `optional` **value?**: `string`

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L13)

##### variant?

> `optional` **variant?**: `"default"` \| `"primary"` \| `"secondary"` \| `"accent"` \| `"warning"` \| `"destructive"` \| `"outline"` \| `"ghost"` \| `null`

Defined in: [packages/ui/src/components/widgets/color-palette/variants.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/variants.ts#L7)

###### Inherited from

`ColorPaletteVariants.variant`

##### vocab?

> `optional` **vocab?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2830

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`vocab`](@repo.ui.data-entry.<internal>.md#vocab)

## Type Aliases

### SidebarMainProps

> **SidebarMainProps** = `object` & [`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: [packages/ui/src/components/widgets/sidebar/SidebarMain.tsx:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/SidebarMain.tsx#L5)

#### Type Declaration

##### ref?

> `optional` **ref?**: [`Ref`](@repo.ui.cards.<internal>.md#ref-5)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

***

### SidebarPanelProps

> **SidebarPanelProps** = `object` & [`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: [packages/ui/src/components/widgets/sidebar/SidebarPanel.tsx:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/SidebarPanel.tsx#L5)

#### Type Declaration

##### ref?

> `optional` **ref?**: [`Ref`](@repo.ui.cards.<internal>.md#ref-5)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

***

### SidebarProps

> **SidebarProps** = `object` & [`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: [packages/ui/src/components/widgets/sidebar/Sidebar.tsx:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/Sidebar.tsx#L12)

#### Type Declaration

##### children?

> `optional` **children?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

##### defaultOpen?

> `optional` **defaultOpen?**: `boolean`

##### onOpenChange?

> `optional` **onOpenChange?**: (`open`) => `void`

###### Parameters

###### open

`boolean`

###### Returns

`void`

##### open?

> `optional` **open?**: `boolean`

##### panelHeight?

> `optional` **panelHeight?**: `string`

##### panelWidth?

> `optional` **panelWidth?**: `string`

##### position?

> `optional` **position?**: `"top"` \| `"right"` \| `"bottom"` \| `"left"`

##### ref?

> `optional` **ref?**: [`Ref`](@repo.ui.cards.<internal>.md#ref-5)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

##### variant?

> `optional` **variant?**: [`ColorVariant`](@repo.ui.feedback.<internal>.md#colorvariant)

***

### SidebarToggleProps

> **SidebarToggleProps** = `object` & [`ButtonHTMLAttributes`](@repo.ui.widgets.<internal>.md#buttonhtmlattributes)\<[`HTMLButtonElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlbuttonelement)\>

Defined in: [packages/ui/src/components/widgets/sidebar/SidebarToggle.tsx:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/SidebarToggle.tsx#L8)

#### Type Declaration

##### ref?

> `optional` **ref?**: [`Ref`](@repo.ui.cards.<internal>.md#ref-5)\<[`HTMLButtonElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlbuttonelement)\>

##### variant?

> `optional` **variant?**: [`ColorVariant`](@repo.ui.feedback.<internal>.md#colorvariant)

## Variables

### colorPaletteVariants

> `const` **colorPaletteVariants**: (`props?`) => `string`

Defined in: [packages/ui/src/components/widgets/color-palette/variants.ts:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/variants.ts#L3)

#### Parameters

##### props?

ConfigVariants\<\{ variant: \{ default: string; primary: string; secondary: string; accent: string; warning: string; destructive: string; ghost: string; outline: string; \}; orientation: \{ horizontal: string; vertical: string; \}; \}\> & ClassProp

#### Returns

`string`

## Functions

### ColorPalette()

> **ColorPalette**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/color-palette/ColorPalette.tsx:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/color-palette/ColorPalette.tsx#L21)

#### Parameters

##### \_\_namedParameters

[`ColorPaletteProps`](#colorpaletteprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### EdgeFieldCanvas()

> **EdgeFieldCanvas**(): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/edge-field/canvas/EdgeFieldCanvas.tsx:164](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/edge-field/canvas/EdgeFieldCanvas.tsx#L164)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### EdgeFieldMask()

> **EdgeFieldMask**(): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/edge-field/mask/EdgeFieldMask.tsx:28](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/edge-field/mask/EdgeFieldMask.tsx#L28)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### EdgeFieldOriginal()

> **EdgeFieldOriginal**(): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/edge-field/svg/EdgeFieldOriginal.tsx:114](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/edge-field/svg/EdgeFieldOriginal.tsx#L114)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### EdgeFieldSvg()

> **EdgeFieldSvg**(): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/edge-field/svg/EdgeFieldSvg.tsx:123](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/edge-field/svg/EdgeFieldSvg.tsx#L123)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### Sidebar()

> **Sidebar**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/sidebar/Sidebar.tsx:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/Sidebar.tsx#L24)

#### Parameters

##### \_\_namedParameters

[`SidebarProps`](#sidebarprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### SidebarMain()

> **SidebarMain**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/sidebar/SidebarMain.tsx:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/SidebarMain.tsx#L9)

#### Parameters

##### \_\_namedParameters

[`SidebarMainProps`](#sidebarmainprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### SidebarPanel()

> **SidebarPanel**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/sidebar/SidebarPanel.tsx:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/SidebarPanel.tsx#L9)

#### Parameters

##### \_\_namedParameters

[`SidebarPanelProps`](#sidebarpanelprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### SidebarToggle()

> **SidebarToggle**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/sidebar/SidebarToggle.tsx:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/sidebar/SidebarToggle.tsx#L13)

#### Parameters

##### \_\_namedParameters

[`SidebarToggleProps`](#sidebartoggleprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### Spinner()

> **Spinner**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/spinner/Spinner.tsx:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/spinner/Spinner.tsx#L3)

#### Parameters

##### \_\_namedParameters

###### className?

`string`

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### SvgExportPanel()

> **SvgExportPanel**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/widgets/SvgExportPanel.tsx:28](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/widgets/SvgExportPanel.tsx#L28)

#### Parameters

##### \_\_namedParameters

[`SvgExportPanelProps`](@repo.ui.widgets.<internal>.md#svgexportpanelprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)
