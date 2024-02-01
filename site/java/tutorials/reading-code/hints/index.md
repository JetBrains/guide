---
type: TutorialStep
date: 2024-03-01
title: Additional hints
topics:
  - tricks
author: md
subtitle: Quick Documentation & Type Information
thumbnail: ./thumbnail.png
video:
  url: "https://www.youtube.com/watch?v=hjGVJHOLSjA"
  start: 121
  end: 164
---

We can also ask for additional hints from our IDE. For example, we might want more information about a particular class or method that is used here but defined elsewhere. We can navigate to other locations in the code base, and back again, but we might end up getting lost in a large code base. Even though we can ask IntelliJ IDEA to locate a file in the project structure, using the shortcut for **Select In** <kbd>⌥F1</kbd> (macOS) / <kbd>Alt+F1</kbd> (Windows/Linux) and pressing 1 for the **Project** tool window, jumping around too much can get overwhelming when trying to understand new code.

Instead, we can use **Quick Documentation** using <kbd>F1</kbd> (macOS) / <kbd>Ctrl+Q</kbd> (Windows/Linux) to pull up the information we need in our current location.
We can also pull up **Type Information** using <kbd>⌃⇧P</kbd> (macOS) / <kbd>Ctrl+Shift+P</kbd> (Windows/Linux) if we’re unsure of what type is returned by a particular method.
