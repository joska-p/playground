---
name: resolving-merge-conflicts
description: 'Use when you need to resolve an in-progress git merge/rebase conflict.'
disable-model-invocation: true
---

1. **See the current state** of the merge/rebase. Check git history and the conflicting files.

2. **Find the primary sources** for each conflict. Read commit messages, check PRs, check original issues. Understand deeply why each change was made.

3. **Resolve each hunk.** Preserve both intents where possible. Where incompatible, pick the one matching the merge's stated goal and note the trade-off. Do **not** invent new behaviour. Always resolve; never `--abort`.

4. Run the project's **automated checks** — typecheck, tests, lint, format. Fix anything the merge broke.

5. **Finish the merge/rebase.** Stage everything and commit. If rebasing, continue until all commits are rebased.
