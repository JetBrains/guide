---
date: 2019-04-17
title: Split Screen Without Tabs
topics:
  - editing
  - testing
author: pwe
subtitle: Get your code and tests side-by-side without resorting to tabs.
seealso:
  - title: Splitting and unsplitting editor window
    href: >-
      https://www.jetbrains.com/help/pycharm/managing-editor-tabs.html#splitting-and-unsplitting-editor-window
  - title: Tabs and split windows
    href: >-
      https://www.jetbrains.com/help/pycharm/migrating-from-text-editors.html#tabs_split_windows
thumbnail: ./thumbnail.png
video: "https://youtu.be/VcqbOtn1s0w"
---

As discussed previously, disabling tabs and focusing on the keyboard helps productivity. But without tabs, how can I see two files at once? For example, the code I'm testing and the tests I'm writing?

You can still split screens without tabs. Simply use the Split Vertically action (no default keybinding so use Find Action) and you'll get two frames. Then open your to-be-tested code on the left and test code on the right.

By default, PyCharm visual test runner tool window is at the bottom. This gives a familiar "TDD" (test-driven development) visual orientation: left for code, right for test, bottom for results. (Although on wide monitors, docking the test tool window on the right might make more sense.)

How to move between the left and right "Split Vertically" frames? The Go To Next Splitter action <kbd>⌃⌥⇥</kbd> (macOS) / <kbd>Alt+Tab</kbd> (Windows/Linux) is a convenient keybinding. Since these are the two files you are switching between editing, our old friend the Recent Files action <kbd>⌘E</kbd> (macOS) / <kbd>Ctrl+E</kbd> (Windows/Linux) is a nice, already-memorized key sequence.
