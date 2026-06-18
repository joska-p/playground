---
description: Explore the codebase graph with graphify
argument-hint: "[question]"
---
Explore the codebase using graphify. Read the graph report first if not already loaded.

## Graph report

The full codebase graph is at `./graphify-out/GRAPH_REPORT.md`. For targeted questions, use:

```bash
graphify query "${1:?ask a specific question about the codebase}"
```

This returns a focused subgraph and is much faster than reading the full report.

To update the graph after code changes:

```bash
graphify update .
```
