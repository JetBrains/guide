---
date: 2025-05-22
title: Select all Occurrences in a File
topics:
  - editing
  - go
author: dlsniper
subtitle: Quickly select all occurrences of a piece of text in the current file
seealso:
  - title: (documentation) GoLand Help - Rename refactoring
    href: >-
      https://blog.jetbrains.com/go/2018/12/07/refactorings-in-goland-rename-refactoring/
thumbnail: ./thumbnail.png
video: "./11.webm"
---

Do you want to select all the occurrences of a piece of code?

Press <kbd>⌘⌃G</kbd> (macOS) / <kbd>Ctrl+Alt+Shift+J</kbd> (Windows/Linux).

After the selection is complete, you can start editing all the fragments as if they were all the same one.

If you plan to use this feature to rename something, then you should have a look at our [Rename refactoring](https://blog.jetbrains.com/go/2018/12/07/refactorings-in-goland-rename-refactoring/), which is designed to work safely across multiple packages, not just at the file level, with full preview and undo support.
