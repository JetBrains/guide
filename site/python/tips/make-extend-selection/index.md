---
date: 2019-03-10
title: Make and Extend Selection Using Keyboard
topics:
  - editing
author: pwe
subtitle: Use the keyboard to select blocks of code then extend/shrink the selection.
seealso:
  - title: Selecting with navigation keys
    href: >-
      https://www.jetbrains.com/help/pycharm/selecting-text-in-the-editor.html#select_with_navigation_keys
  - title: Extending selection
    href: >-
      https://www.jetbrains.com/help/pycharm/selecting-text-in-the-editor.html#extend_selection
  - title: Shrinking selection
    href: >-
      https://www.jetbrains.com/help/pycharm/selecting-text-in-the-editor.html#shrink_selection
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/mvZg7TaRjCM"
---

In coding, we select code and operate on it. For example, move it to another line, change its indentation, etc.

You can use your mouse to make your selection. Or, use the keyboard.

For example, use
`Move Caret to Previous Word with Selection` <kbd>⌥⇧←</kbd> (macOS) / <kbd>Ctrl+Shift+Left Arrow</kbd> (Windows/Linux) to (a) move the cursor forward or backward a word, while (b) expanding the selection along the way. Want to select three words? Do it three times.

In Python code you frequently want to gradually expand a selection from where the cursor is at: the symbol, then the substatement, then the full statement, then the line, then the block, etc. <kbd>⌥↑</kbd> (macOS) / <kbd>Ctrl+W</kbd> (Windows/Linux) is ideal. It works semantically. Keep pressing it until you get the selection you want. Go too far? Do the inverse to shrink the selection.

Without using the mouse.

Finally, PyCharm also [supports multiselection](https://www.jetbrains.com/help/pycharm/selecting-text-in-the-editor.html#multiselection) aka multiple carets.
