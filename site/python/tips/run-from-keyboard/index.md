---
date: 2019-04-15
title: Run From Keyboard
topics:
  - editing
author: pwe
subtitle: Use the keyboard to select and run a run configuration.
seealso:
  - title: Running
    href: "https://www.jetbrains.com/help/pycharm/running-code.html"
thumbnail: ./thumbnail.png
video: "https://youtu.be/oSEMKeUVjlE"
---

These tips have a recurring theme: use your keyboard, not your mouse. Running your code should be the same way.

Use the Run action <kbd>⌃⌥R</kbd> (macOS) / <kbd>Shift+Alt+F10</kbd> (Windows/Linux) to get a popup listing your defined run configurations, both permanent and temporary. You can then use the arrow keys or speed-type to highlight the one you want to run, pressing <kbd>⏎</kbd> (macOS) / <kbd>Enter</kbd> (Windows/Linux) to select and execute it.

"Select" is used intentionally: one you select this run configuration, it is the active one, and the simpler Run "your configuration" action <kbd>⌃⌥R</kbd> (macOS) / <kbd>Shift+Alt+F10</kbd> (Windows/Linux) will immediately run it.

You can do more from the keyboard than just run it. Each entry in the popup has a submenu which you can access by pressing the right arrow. This lets you choose how you want to run it (Run, Debug, Coverage, Profile, Run under the concurrency diagram, etc.) as well as edit that configuration or delete it.

Debugging is popular option, so it gets its own popup sequence. Use the Debug action <kbd>⌥⌘R</kbd> (macOS) / <kbd>F9</kbd> (Windows/Linux) to give the popup, but leading directly to debugging (to skip the submenu step.) Once selected, you can re-run that debug configuration with the Debug &lt;your configuration> action <kbd>⌃D</kbd> (macOS) / <kbd>Shift+F9</kbd> (Windows/Linux).

Again, for both the run popup and debug popup, don't forget to speed type to select, instead of the arrow keys.

There are, obviously, many other ways to run your code (menus, right click, gutter icons, tool window buttons.) For keyboard-centric folks, give this a try.
