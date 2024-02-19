---
date: 2022-07-15
title: Rename constants that use reserved names
topics:
  - go
  - inspections
  - quick-fixes
author: ap
subtitle: Rename a constant if it uses a name of a built-in constant.
thumbnail: ./thumbnail.png
screenshot: ./screenshot.png
---

The inspection will be triggered if you try to assign a value to a constant with one of the following names: `iota`, `true`, or `false`. GoLand will suggest you to rename such usages.

**How to use:**

Place the cursor on a highlighted constant name, press <kbd>⌘⌥⏎</kbd> (macOS) / <kbd>Ctrl+Alt+Enter</kbd> (Windows/Linux), and select **Rename constant**. Type a new name and press <kbd>⏎<kbd/> (macOS) / <kbd>Enter</kbd> (Windows/Linux).
