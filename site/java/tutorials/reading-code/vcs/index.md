---
type: TutorialStep
date: 2024-03-01
title: Version control (Git) history
topics:
  - tricks
  - vcs
author: md
subtitle: Using Version control (Git) history to understand the project.
thumbnail: ./thumbnail.png
video:
  url: "https://www.youtube.com/watch?v=hjGVJHOLSjA"
  start: 277
  end: 326
---

We might be interested in when the code was last changed and why. We can find out by looking at the history in our version control system. If we are using Git, we can click the gutter to enable **Annotate with Git Blame**. Or, if you don’t like using the mouse, you can open the VCS Popup using <kbd>⌃V</kbd> (macOS) / <kbd>Alt+`</kbd> (Windows/Linux) and enable or disable this option from there.
In the gutter, we can now see when a line was last changed and by whom. We can hover over this information to see the commit this change was a part of and its corresponding commit message. Or we can click a line in the gutter to open the **Git** tool window, with the selected commit highlighted. Here, we can see the commit, its commit message and which files were changed. We can open the diff of the files, using <kbd>⌘D</kbd> (macOS) / <kbd>Ctrl+D</kbd> (Windows/Linux) on the file, to see exactly what was changed in that file.
