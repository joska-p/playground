### Component Story Checklist Template

```pseudo
COMPONENT: [ComponentName]

1. Preparation
   - [ ] Understand main purpose of the component
   - [ ] List all props + possible values
   - [ ] Identify variants (primary, secondary, outline...)
   - [ ] Identify states (default, disabled, loading, error, active...)
   - [ ] Note real usage contexts in the app

2. Core Stories (Required)
   - [ ] Default → Most common + recommended usage
   - [ ] Variants → Show all visual style variations
   - [ ] States → Show disabled, loading, error, etc.
   - [ ] Sizes (if applicable)

3. Additional Stories (When Relevant)
   - [ ] Compositions → With icons, labels, children, etc.
   - [ ] Edge Cases → Long text, many items, extreme values
   - [ ] Accessibility / Interaction
   - [ ] Responsive behavior

4. Quality Checks
   - [ ] Default story is clean and realistic
   - [ ] All important props are controllable
   - [ ] Stories are well grouped and easy to scan
   - [ ] Autodocs is enabled
   - [ ] Component looks good in light + dark mode
   - [ ] Clear story names and descriptions
```

---

### Examples: Do vs Don't

**1. Default Story**

- **Do**: Show the most common real usage
  ```pseudo
  Default:
    props: { label: "Save Changes", variant: "primary", size: "md" }
  ```
- **Don't**: Use unrealistic props
  ```pseudo
  Default:
    props: { label: "Lorem ipsum dolor sit amet...", variant: "ghost", size: "xl" } // Bad
  ```

**2. Variants Story**

- **Do**: Show all variants together for easy comparison
  ```pseudo
  Variants:
    Render multiple buttons side by side: primary, secondary, ghost, destructive
  ```
- **Don't**: Create one story per variant (too fragmented)

**3. States Story**

- **Do**:
  ```pseudo
  States:
    Show: Default | Disabled | Loading | Error
  ```
- **Don't**: Only show disabled state in a separate story while hiding it from main view

**4. Naming**

- **Do**: `Default`, `Variants`, `States`, `WithIcon`, `LongText`
- **Don't**: `Story1`, `Test`, `ButtonPrimary`, `MyTestStory`

**5. Controls**

- **Do**: Use proper control types (`select`, `radio`, `boolean`)
- **Don't**: Leave complex props with raw text input only

---

### Quick Pseudo-Code Template (for your reference)

```pseudo
Meta:
  title: "Components/[ComponentName]"
  component: Component
  tags: ['autodocs']
  parameters: { layout: "centered" }

Stories:

  Default:
    args: { ...most common props }

  Variants:
    render: () => Show all variants horizontally

  States:
    render: () => Show different states

  Sizes:
    render: () => Show all sizes

  EdgeCase:
    args: { extreme prop values }
```

---
