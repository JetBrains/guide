---
date: 2020-12-03
title: Detect variable shadowing while writing Go code
topics:
  - editing
  - go
author: dlsniper
subtitle: Easily spot where you shadow variables that you did not intend to
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
screenshot: ./screenshot.png
---

**How to use:**

While writing code, observe if the variable color changes. If it does, then invoke the _Context Actions_ menu via <kbd>⌘⌥⏎</kbd> (macOS) / <kbd>Ctrl+Alt+Enter</kbd> (Windows/Linux) and select **Navigate to shadowed declaration** to identify the originally shadowed identifier.
