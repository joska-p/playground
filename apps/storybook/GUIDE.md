### The Component Story Method (Best Practice Workflow)

Follow these steps **in order** for every new component:

---

### 1. Preparation (Before Writing Stories)

- Understand the component’s **purpose** and **main use cases**
- List all **props** and their possible values
- Identify **variants** (style variations)
- Identify **states** (interactive/behavioral states)
- Think about **real-world usage** in your app

---

### 2. Story Structure (The Golden Rule)

Every component should have these stories (in this recommended order):

| Order | Story Name        | Purpose                               | When to Include          |
| ----- | ----------------- | ------------------------------------- | ------------------------ |
| 1     | **Default**       | Most common / recommended usage       | Always                   |
| 2     | **Variants**      | All visual style variations           | If multiple variants     |
| 3     | **Sizes**         | Different size options                | If applicable            |
| 4     | **States**        | Disabled, Loading, Error, etc.        | Always                   |
| 5     | **Compositions**  | With icons, labels, children, etc.    | As needed                |
| 6     | **Edge Cases**    | Long text, many items, extreme values | Important for robustness |
| 7     | **Accessibility** | Focus, keyboard, screen reader        | For complex components   |

---

### 3. Building Process (Step-by-Step)

**For each component, ask yourself these questions:**

1. **What is the primary way this component should be used?** → This becomes your `Default` story.
2. **What are the different visual styles?** → Group them in a `Variants` story.
3. **What states can this component be in?** → Show them clearly (especially disabled, loading, active, error).
4. **What props most affect its look/behavior?** → Make sure they are well controlled in Storybook.
5. **How will developers actually use it?** → Create stories that mirror real usage.
6. **What could go wrong?** → Add edge cases.

---

### 4. Best Practices Checklist

- **Default story first** — Keep it clean and realistic (this is what most people will see)
- Show **one thing per story** when possible (Variants, States, Sizes)
- Use clear, self-explanatory story names
- Always enable **Autodocs** (`tags: ['autodocs']`)
- Make controls useful (use `select`, `radio`, `boolean`, etc.)
- Show **multiple instances** side by side when demonstrating variants/states
- Add a short description for the component and important stories
- Test responsiveness (use the viewport addon)
- Consider dark mode support
- For interactive components, add play functions (clicks, typing, etc.)

---

### 5. Quality Checklist (Before Marking Story as Done)

- Can a new developer understand how to use the component just by looking at the stories?
- Are all important props demonstrated?
- Are all design variants covered?
- Are behavioral states (loading, disabled, error) visible?
- Does it look good in both light and dark mode?
- Is the `Default` story representative of real usage?

---

### Bonus Tips for UI Libraries

- Be **consistent** across all components (same story naming, layout style, etc.)
- Prioritize **developer experience** — stories should teach, not just showcase
- Keep stories **maintenance-friendly** (avoid overly complex logic)
- Update stories whenever the component changes
- Use CSF3 format (modern Storybook)

---
