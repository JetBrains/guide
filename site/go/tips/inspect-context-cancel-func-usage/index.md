---
date: 2020-12-03
title: Check context.CancelFunc usage
topics:
  - go
author: dlsniper
subtitle: Ensure that the cancel function is always called
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=tfM9kzrR2Lc&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=18
---

**How to use:**

In code that uses a _context.WithCancel_ call, check for any warning messages. If one shows up, you can use the _Show Context Action_ menu, <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux), and use either the **Navigate to 'cancel'** function or **Navigate to the end of the problematic execution path** options from it. By using these feature, you can then gain the insight into what the IDE sees as a problematic execution path, and place the correct call to the cancel function.
