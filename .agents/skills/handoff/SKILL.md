---
name: handoff
description: 'Compact the current conversation into a handoff document for another agent to pick up.'
argument-hint: 'What will the next session be used for?'
disable-model-invocation: true
---

The handoff document summarizes the current conversation so a fresh agent continues the work. It saves to `./_TEMP/handoff/`.

A "suggested skills" section names the skills the next agent calls. Content already captured elsewhere (specs, plans, ADRs, issues, commits, diffs) travels by path reference; the document adds only what those artifacts lack. Sensitive information (API keys, passwords, PII) appears redacted.

User arguments describe the next session's focus and tailor the document accordingly.
When the handoff is written. And only then, read and execute the instructions in `./.agents/prompts/kb/kb-00-final-prompt.md`.
