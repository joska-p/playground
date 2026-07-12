---

## The "Atlas Explorer Log" README Template

```markdown
---
title: "The Name of the Discovery"
coordinates: "Sector/Category (e.g., /visuals, /algorithms, /math)"
status: "Active / Dormant / Unstable"
date_discovered: YYYY-MM-DD
---

# [The Name of the Discovery]

> A one or two-sentence poetic/evocative description of what this experiment actually *does* or *visualizes* when it runs. (e.g., "A machine that maps arbitrary text strings into unique, deterministic digital tapestries.")

---

## 🧭 The Essence
*What is this, and why does it exist?*
Explain the core concept, the spark of inspiration, or the phenomenon being observed. Focus on the *intent* and the *concept*, not the code. What makes this a unique destination in your atlas?

## 🚀 Quick Launch
How do you wake this experiment up? Keep it to the absolute bare minimum commands.

```bash
# To run it locally:
pnpm dev --filter=[package-name]

```

## 🗺️ Field Notes

*The things the source code won't tell you.*
Use this section for the hidden context.

* **The Catalyst:** What paper, mathematical concept, or late-night thought triggered this? (e.g., "Inspired by Adrian Perrig's Random-Art paper...")
*  Quirks & Anomalies: Are there specific inputs that produce beautiful glitches? Is there an intentional constraint you forced upon yourself?
* **Future Horizons:** (Optional) A loose idea of where this path might lead next if you ever return to it.

```

---

## 🎨 Defining the Tone: The Cartographer's Voice

To make your website feel like an Atlas, the tone should balance **scientific curiosity** with **creative wonder**. You aren't a developer writing a ticket; you are an explorer documenting a strange island you just mapped.

### 1. Evocative, Not Dry
Instead of describing the tech stack, describe the *output* or the *experience*.
* ❌ *Instead of:* "A React component using HTML5 Canvas to render hashes via an algorithm."
* transform it into: "An engine that translates chaotic data strings into ordered visual landscapes."

### 2. High-Level and Concept-First
Assume the reader (even future you) can read the functions. Tell them *why* those functions exist. If you implemented seam carving, don't explain the dynamic programming matrix. Explain that this is a tool for "retargeting images by finding and destroying paths of least resistance."

### 3. Embrace the "Work in Progress"
Since everything is a WIP, lean into it thematically. Use words like *Unstable*, *Experimental*, *Terraforming*, or *Dormant* in your frontmatter status. It makes the unfinished nature of the code feel like an intentional characteristic of a living, breathing ecosystem rather than a failure to finish a project.

This setup keeps your maintenance overhead incredibly low. If you change a function name or swap a library, you don't have to touch this file. The README only changes if the *reason* for the experiment changes.

```
