# Tailwind Cleanup — Pass 2: Execute

## Scope Boundary — Read This First

You are operating inside a monorepo. The user has given you a specific package path. That path is your **entire world for this session**.

**Hard rules:**

- Only read and edit files **inside the provided package path**. Do not traverse upward, do not touch sibling packages, do not touch the monorepo root.
- If a change in the report has `fix parent` direction and the parent file is **outside the package boundary**, skip that change ID and note it in the output as `⚠️ out of scope — apply manually or in a separate session for that package`.
- Do not follow imports outside the package boundary for any reason.

---

## Context

You are applying pre-approved Tailwind CSS cleanup changes to a React/JSX package.
You have been given:

1. **The cleanup report** — a markdown document produced by Pass 1, listing every change by ID
2. **The package directory** — the source files to modify

Your job is to apply exactly the changes listed in the report, nothing more.

---

## Before You Start

Read the report document in full. Note:

- Which change IDs are present (W*, C*, H*, F*)
- Any IDs that have been **crossed out, deleted, or marked SKIP** by the reviewer — do not apply those
- Any IDs with **reviewer annotations** (e.g. "fix parent instead of child") — follow the annotation, not the original

If the report contains no changes for a file, do not open or touch that file.

---

## Applying Changes

Process files in the order they appear in the report.

For each file:

### Step 1 — Wrappers (W\_ IDs)

Apply wrapper removals in **reverse line order** (bottom to top) so earlier line numbers stay valid.

- Unwrap the div: move its children up one level
- Relocate any classes noted in the "Classes to relocate" column — add them to the target element
- If the wrapper had an event handler or ref, attach it to the child instead; if that is not possible, flag in the output and skip that removal

### Step 2 — Intra-component classes (C\_ IDs)

Remove the listed class(es) from the listed element.

- Do not touch any other class on that element
- Do not reformat the className string beyond removing the class

### Step 3 — Heritage classes (H\_ IDs)

Check the **Fix direction** column:

- `fix child` → remove the class from the child's root element in this file
- `fix parent` → remove the class from the wrapper at the call site (the parent file and line are in the Reason column) — edit that parent file instead
- If the parent file is outside the current package directory, note it in the output and skip

### Step 4 — Flags (F\_ IDs)

Do not apply any changes for flagged items. Skip entirely.

---

## Output Per File

For each modified file, output:

```
### [FileName.tsx]

Applied:
- W1 ✓ — unwrapped div at line 14, no classes to relocate
- W2 ✓ — unwrapped div at line 38, moved `mb-4` to child root (line 39)
- C1 ✓ — removed `flex-row` at line 22
- H1 ✓ — removed `mt-6` from root div at line 10 (fix child)
- H2 ✓ — removed `rounded-xl` from root div at line 10 (fix child)

Skipped:
- C3 SKIP — marked skip by reviewer
- W3 SKIP — wrapper has ref, cannot safely unwrap without refactor

[full updated file content]
```

---

## Final Summary

After all files, output:

| File            | Applied | Skipped | Notes                       |
| --------------- | ------- | ------- | --------------------------- |
| FileName.tsx    | 5       | 1       | W3 skipped — ref on wrapper |
| AnotherFile.tsx | 4       | 0       | —                           |
| **Total**       | **9**   | **1**   |                             |

---

## Hard Rules

- **Only apply changes listed in the report by ID.** Do not invent additional improvements.
- **Do not reformat, rename, or restructure** anything not covered by a change ID.
- **Do not recurse** into subdirectories unless the report references files there.
- **Do not remove** conditional or dynamic classes (`cn()`, ternaries, interpolations) even if they look redundant — those are flagged F\_ items and are never executed in this pass.
- If a line number in the report no longer matches after earlier edits in the same file, use the class/element description to locate it — do not skip silently.
- If you cannot confidently locate a change, output `[ID] ⚠️ could not locate — skipped` and move on.
