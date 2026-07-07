---
title: Data Fetching
description: Rules for server/async data fetching and its separation from client state.
tags:
  - conventions
  - reference
---

# Data Fetching

## Contents

- [Rule](#rule)

## Rule

- TanStack Query for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Zustand stores hold **client-only** state. They do not mirror server data.
