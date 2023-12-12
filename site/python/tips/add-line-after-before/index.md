---
date: 2019-03-09
title: Add Line After/Before
topics:
  - editing
author: pwe
subtitle: "Smart-add a line, from the middle of a line, after or before the current line."
seealso:
  - title: "Adding, Deleting and Moving Code Elements"
    href: >-
      https://www.jetbrains.com/help/pycharm/adding-deleting-and-moving-lines.html
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/pHmv6RzKrDk"
---

It's easy to overlook, but we frequently add a line of code while in the middle of another line. Perhaps we were fixing something and want to proceed to the next line. Perhaps we were on an import and want another import on the line above.

It's tempting, for adding a line after, to treat this as a two-step process:

- Go to the end of the line (ugh, sometimes with the mouse)
- Press <kbd>⏎</kbd> (macOS) / <kbd>Enter</kbd> (Windows/Linux)

Adding a line above is worse:

- Go to the beginning of the line
- Press <kbd>⏎</kbd> (macOS) / <kbd>Enter</kbd> (Windows/Linux) to make space above
- Press <kbd>↑</kbd> (macOS) / <kbd>Up Arrow</kbd> (Windows/Linux) to go to that new, empty line

- Perhaps press tab a few times to get the indentation right

Instead, use `Start New Line` <kbd>⇧⏎</kbd> (macOS) / <kbd>Shift+Enter</kbd> (Windows/Linux). With your cursor anywhere in the current line -- where you are just finishing an edit -- you can then get an empty next line, with correct indentation.

For a line above, use `Start New Line Before Current` <kbd>⌘⌥⏎</kbd> (macOS) / <kbd>Ctrl+Alt+Enter</kbd> (Windows/Linux) You get a new line, indented appropriately for the language and context.
