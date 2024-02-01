---
date: 2019-01-20
title: Activate Navigation Bar
topics:
  - navigation
author: pwe
subtitle: "Bring up the Navigation Bar as needed, let it disappear when finished."
seealso:
  - title: Navigation bar
    href: >-
      https://www.jetbrains.com/help/pycharm/part-4-using-the-navigation-bar.html
  - title: Navigating Tips and Tricks
    href: "https://www.jetbrains.com/help/pycharm/navigation-bar.html"
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/-uyCSK6gvp4"
---

Getting into the flow means stripping down your UI distraction (turn off the _Project_ tool window and _Navigation Bar_) then going _keyboard-centric_ to avoid the mouse. But you still need to get to your files, and sometimes you'd prefer to browse instead of use Recent Files <kbd>⌘E</kbd> (macOS) / <kbd>Ctrl+E</kbd> (Windows/Linux) or the Find File <kbd>⌘⇧O</kbd> (macOS) / <kbd>Ctrl+Shift+N</kbd> (Windows/Linux) action.

If you've uncluttered your UI by hiding the Navigation Bar, bring it back on demand. Use **Navigate | Jump to Navigation Bar** <kbd>⌘↑</kbd> (macOS) / <kbd>Alt+Home</kbd> (Windows/Linux) to temporarily re-active the Navigation Bar, but as a temporary panel. Once you use use it, the window disappears.

If you use this tip and temporarily make it appear, how do you make it disappear? Press Jump to Source <kbd>⌘↓</kbd> (macOS) / <kbd>F4</kbd> (Windows/Linux) or just hit <kbd>␛</kbd> (macOS) / <kbd>Escape</kbd> (Windows/Linux) to go back to where you were working.

Perhaps you didn't hide the Navigation Bar. I don't, because I like those other toolbar buttons to the right. But still, you'd like to use it without the mouse. Activating the Navigation Bar still helps, as it moves the focus out from the editor and up to the Navigation Bar, where you can then use your cursor keys.

How did we hide it in the Navigation Bar first place, or bring it back if wanted? The _View_ menu's _Navigation Bar_ item is a toggle. Want a faster, keyboard-centric way to toggle? <kbd>⌘⇧A</kbd> (macOS) / <kbd>Ctrl+Shift+A</kbd> (Windows/Linux) lets you search for such settings and even toggle inline. Type `vi nav` to speed search, make sure the selection is on _View: Navigation Bar_, then press enter. The setting is toggled...no mouse usage needed.
