---
date: 2024-06-11
title: Auto Install and Import Packages on the Fly
topics:
  - completion
  - python
author: hs
subtitle: >-
  Start typing a name in the editor. If the name references a class that has not been imported you can import it and add the import in one step.
thumbnail: ./thumbnail.png
seealso:
  - title: Install and import packages on the fly
    href: "https://www.jetbrains.com/help/pycharm/creating-and-optimizing-imports.html#lkxe58_111"
animatedGif:
  file: ./tip.webm
---

## The Problem

Let's say you want to install and create the import statement for a new package you've just typed.

## The Solution

Easy, invoke Context Actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux), then choose **Install and Import package**.

PyCharm will install the package and create the import according to your project styles.
