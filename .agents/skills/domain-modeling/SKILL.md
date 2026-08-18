---
name: domain-modeling
description: "Build and sharpen a project's domain model. Use when discussing codebase terminology, writing a CONTEXT.md, or recording an ADR."
---

# Domain Modeling

Actively build and sharpen the project's domain model as you design. Challenge terms, invent edge-case scenarios, and record glossary and decisions the moment they crystallise.

## File structure

```
/
├── CONTEXT.md            ← glossary only, no implementation details
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

Create files lazily — only when you have something to write.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User?"

### Discuss concrete scenarios

Stress-test domain relationships with specific scenarios. Invent edge cases that force precision about boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. Surface contradictions: "Your code cancels entire Orders, but you just said partial cancellation is possible."

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch. `CONTEXT.md` is a glossary — no implementation details, no specs, no scratch pads.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — meaningful cost of changing mind later.
2. **Surprising without context** — a future reader will wonder "why?"
3. **Real trade-off** — genuine alternatives existed.

If any is missing, skip the ADR.
