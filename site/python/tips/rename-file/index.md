---
date: 2019-03-12
title: Rename a File and Its References
topics:
  - editing
author: pwe
subtitle: Change your mind on a file name and the IDE makes all the changes for you.
seealso:
  - title: Renaming a file or directory
    href: "https://www.jetbrains.com/help/pycharm/rename-refactorings.html"
thumbnail: ./thumbnail.png
video: "https://youtu.be/IqPm9RYTNBM"
---

You made a file. You tried to choose the right filename. You then used it all over your project.

Now you've changed your mind.

It's sitting there, annoying you, but you can't be bothered to find all the places that use it. Search and replace might find a bunch of false positives. You'd really like something that understood symbols, and just in imports.

Select the file and use **Refactor | Rename** <kbd>⌃T<kbd/> (macOS) / <kbd>Shift+Ctrl+Alt+T</kbd> (Windows/Linux) and then '1' to change the name of the file and occurrences. This will also adjust VCS. Best of all, if you change your mind, **\*Undo** puts it all back as one editor transaction.
