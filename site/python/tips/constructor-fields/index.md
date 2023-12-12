---
date: 2019-03-18
title: Adding Fields In a Constructor
topics:
  - editing
author: pwe
subtitle: Let your IDE add constructor arguments to your instance.
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/cJ0tP9kxoYk"
---

It's one of those chores...your class has an `__init__` with some arguments and you need to assign them to `self`. What a lot of typing.

Let the IDE do it for you. As you type the argument name, hit <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and choose `Add 'field' to constructor`, then type the next argument. Or later, put the cursor on each argument and invoke it. PyCharm will create the assignment for you.
