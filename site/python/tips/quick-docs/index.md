---
date: 2019-03-11
title: Quick Documentation
topics:
  - editing
author: pwe
subtitle: View arguments and documentation without interrupting your flow.
seealso:
  - title: Viewing Inline Documentation
    href: "https://www.jetbrains.com/help/pycharm/inline-documentation.html"
thumbnail: ./thumbnail.png
video: "https://youtu.be/etvFP6kXsmo"
---

We frequently encounter code that we're not sure about. Other people's code. Heck, even our code. Sometimes we just want the arguments for a function. Other times we want to know positional versus keyword args. Or the types of the arguments. Or their default values. Or a nice rendered docstring.

PyCharm has several facilities for showing you documentation about a symbol.

First, Quick Documentation <kbd>F1</kbd> (macOS) / <kbd>Ctrl+Q</kbd> (Windows/Linux) brings non-obtrusive inline popup showing all that information, with a hyperlink where you can navigate to the definition. Press it again and the popup turns into a tool window which updates for each symbol that you land on. Always there, always helping...until you want to hide it, like any other IDE tool window.

Want the full docs in a browser, but don't want to hunt around to find it? For many popular packages, External Documentation <kbd>⇧F1</kbd> (macOS) / <kbd>Shift+F1</kbd> (Windows/Linux) brings up a browser on the documentation page for that symbol.
