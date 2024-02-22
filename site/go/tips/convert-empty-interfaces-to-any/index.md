---
date: 2022-07-14
title: Convert empty interfaces to `any`
topics:
  - editing
  - generics
  - go
author: ap
subtitle: Check and replace empty interfaces that are used as types or type constraints.
thumbnail: ./thumbnail.png
screenshot: ./screenshot.png
---

GoLand has an inspection that reports usages of empty interfaces used as a type or a type constraint. To fix such usages, try the **Replace with 'any'** intention action.

**How to use:**
Place the cursor on an empty interface, press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux), and select **Replace with 'any'**.
