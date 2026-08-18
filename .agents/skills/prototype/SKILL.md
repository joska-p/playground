---
name: prototype
description: 'Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check a state model, logic, or UI.'
disable-model-invocation: true
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

## Pick a branch

- **"Does this logic / state model feel right?"** → Build a single shareable HTML file — free-play buttons plus tabbed guided walkthroughs — that pushes the state machine through hard-to-reason cases, and that a non-developer can drive.
- **"What should this look like?"** → Generate several radically different UI variations on a single route, switchable via URL search param and a floating bottom bar.

If the question is ambiguous and the user isn't reachable, default to whichever branch better matches the surrounding code and state the assumption.

## Rules

1. **Throwaway from day one, clearly marked.** Locate near where it'll actually be used — but name it so a reader sees it's a prototype.
2. **Trivial to run.** One command or one double-click. No thinking required.
3. **No persistence by default.** State in memory. If the question involves a database, hit a scratch DB with a clear "PROTOTYPE — wipe me" name.
4. **Skip the polish.** No tests, no error handling beyond what makes it runnable, no abstractions.
5. **Surface the state.** After every action, print or render the full relevant state.
6. **Capture when done.** Fold validated decisions into real code. Commit the prototype to a throwaway branch, leave a context pointer. Main keeps only the validated decision.
