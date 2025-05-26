---
date: 2025-05-08
title: Cleanup Code Before Commit
topics:
  - platform
  - vcs
author: dlsniper
subtitle: Remove all the redundant parenthesis and other unneeded code before commit.
thumbnail: ./thumbnail.png
video: "./cleanup_code.webm"
---

Sometimes an extra pair of parenthesis make their way into our code. Since it's not needed to improve the clarity or help the code function in any way, it's better to remove it. That's why, it's useful to run a _Cleanup_ step before the code reaches upstream.

Invoke the _Commit_ using <kbd>⌘K</kbd> (macOS) / <kbd>Ctrl+K</kbd> (Windows/Linux), then select the _Commit options_, and select the **Cleanup** feature.
