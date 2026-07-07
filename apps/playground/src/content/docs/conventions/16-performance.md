---
title: Performance
description: Throttling high-frequency inputs and using deterministic keys.
tags:
  - conventions
  - reference
---

# Performance

## Contents

- [Rule](#rule)

## Rule

- High-frequency inputs (resize, mouse, scroll): throttle or debounce before layout calculations.
- Use deterministic keys derived from data — no random keys.
