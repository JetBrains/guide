---
date: 2024-06-11
title: Edit Text in Multiple Places At Once
subtitle: How to use multiple cursors to code faster in JetBrains IDEs.
topics:
  - editing
author: pwe
seealso:
  - title: Multiple cursors in JetBrains IDEs
    href: >-
      https://www.jetbrains.com/help/idea/multicursor.html#multiple_words
  - title: Webinar Recording - 42 WebStorm Tips and Tricks
    href: >-
      https://blog.jetbrains.com/webstorm/2020/05/webinar-recording-42-webstorm-tips-and-tricks/
thumbnail: ./thumbnail.png
video: ./tip.webm
obsoletes:
  - /javascript/multi-cursor/
  - /java/tips/find-select-multiple-occurrences/
---

Want to edit the same thing, in multiple places, at once?

Multiple carets to the rescue. Click the first occurrence, then invoke "Add Selection for Next Occurrence" <kbd>
^G</kbd> (macOS) / <kbd>Alt+J</kbd> (Windows/Linux)for each change.
Type the replacement. Press <kbd>␛</kbd> when finished.

Or, all at once by invoking "Select All Occurrences" <kbd>⌘⌃G</kbd> (macOS) / <kbd>Ctrl+Alt+Shift+J</kbd> (
Windows/Linux).
Then, type the replacement as before.

Works in all languages and IDEs. Other tips:

- To add or remove multiple carets, you can also press and hold the <kbd>⌘</kbd> (macOS) / <kbd>Alt</kbd> (
  Windows/Linux), then click to add a new caret. You can also make a multiple selection by holding <kbd>Shift+Alt</kbd>
  and dragging the caret.
- To remove all the carets, press <kbd>␛</kbd> (macOS) / <kbd>Escape</kbd> (Windows/Linux).
