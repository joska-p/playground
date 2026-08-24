---
name: workshop
description: Persistent personal toolbox at ~/.ai-workshop/. Use before writing sed/awk chains, fragile bash one-liners, or throwaway helper scripts, and whenever creating or updating personal tooling.
---

# Workshop

You own a persistent toolbox at `~/.ai-workshop/`. It survives container restarts and never belongs to any git repo.

## Layout

- `scripts/` — executable tools, one file per tool
- `TOOLS.md` — SSOT: how every tool is invoked, its arguments, its known pitfalls
- `CHANGELOG.md` — dated journal of every addition or change

## Rules

1. When a bash chain turns into quoting gymnastics (sed, awk, nested pipes), stop and build a tool instead. Python via PEP 723: dependencies declared in the header, executed with `uv run --script`, zero venv management.
2. Tools receive bulky payloads as temp-file paths under `/tmp/opencode/`, not inline strings, so shell escaping never touches content.
3. Check `TOOLS.md` before solving a problem by hand — a tool may already exist.
4. After creating or changing a tool: update `TOOLS.md` and append a dated entry to `CHANGELOG.md`. An undocumented tool does not exist.
5. Test every tool end-to-end, including error paths, before documenting it.
