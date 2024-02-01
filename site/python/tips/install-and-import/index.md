---
date: 2018-12-04
title: Install and import
topics:
  - python
author: pwe
subtitle: "While typing a symbol, let PyCharm install it and generate the import."
seealso:
  - title: Creating and Optimizing Imports
    href: >-
      https://www.jetbrains.com/help/pycharm/creating-and-optimizing-imports.html
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/ulT1LSWFqqE"
---

You're writing code and want to import a package, and want PyCharm to generate the import. But you haven't installed it yet. PyCharm can do both.

Type the name of the package and hit <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux), then choose **Install and Import package**. PyCharm will do both: you'll see a notification during the installation,
then the import will be generated in the right way, according to your project styles.

Extra credit: if PyCharm sees that this new package isn't recorded in your package's `requirements.txt` or `Pipfile`, it will generate a warning which you can correct
with -- again -- <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux).
