---
name: grilling
description: "Relentless interview to stress-test a plan, decision, or idea. Use when the user wants to sharpen their thinking or uses any 'grill' trigger."
---

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are settled — questions you can ask _now_ without guessing at unheard answers. Ask the whole frontier in one round: number each question and give your recommended answer. Wait for answers before the next round.

Each question:

```
❓ **Q1** - **<question title>**: <body, might include choices>

➡️ <your recommended answer>
```

Each round reshapes the tree: settled decisions push the frontier outward. Recompute and ask the next round. A question whose answer depends on another still open belongs to a _later_ round.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment, dispatch a sub-agent to find it; don't ask the user for anything you could look up yourself. Don't block on it — only downstream questions wait; ask the rest now. _Decisions_ are the user's: put each to them and wait.

Done when the frontier is empty: every branch visited, nothing left silently assumed. Do not act until the user confirms shared understanding.
