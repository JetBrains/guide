---
date: 2024-06-12
title: Reformat Your Code
topics:
  - editing
  - ide
  - tricks
author: hs
subtitle: Reformat a specific piece of code or the whole file according to your preferences.
thumbnail: ./thumbnail.png
seealso:
  - title: Reformat and Rearrange Code - Tutorial
    href: "https://www.jetbrains.com/help/idea/reformat-and-rearrange-code.html"
obsoletes:
  - /python/tips/reformat-code/
  - /go/tips/reformat-code/
  - /java/tips/reformat-code-or-file/
  - /java/tips/reformat-code/
---

## The Problem

You're busy hammering out line after line of amazing code but when you're done and you look up to marvel at your masterpiece, you see that the indentation is all wrong.

## The Solution

You can quickly reformat the whole file by invoking "Reformat Code" <kbd>⌘⌥L</kbd> (macOS) / <kbd>Ctrl+Alt+L</kbd> (Windows/Linux).

![reformat-file-java.png](reformat-file-java.png)

As you'd expect, this works in any JetBrains IDE.

![reformat-file-python.png](reformat-file-python.png)

However, what if you just want to reformat just one block of code? For example, maybe the whole team changed their code style, and you don't want a large full file reformat to be part of this specific commit. In that case, select the code you want to reformat and again invoke "Reformat Code" <kbd>⌘⌥L</kbd> (macOS) / <kbd> Ctrl+Alt+L</kbd> (Windows/Linux).

![reformat-block-c-sharp.png](reformat-block-c-sharp.png)

You can reformat code at the directory level too! Invoke your Project tool window <kbd>⌘1</kbd> (macOS) / <kbd>Alt+1</kbd> (Windows/Linux), select the directory you want to reformat and invoke "Reformat Code" <kbd>⌘⌥L</kbd> (macOS) / <kbd>Ctrl+Alt+L</kbd> (Windows/Linux) again. A word of warning here, you probably don't want to mix large commits that include reformatting and code changes - it can make deciphering the commit harder for the next person.

Lastly, there are additional settings you can use for reformatting your code which you can access by invoking the "Reformat Code Dialog" <kbd>⌘⌥⇧L</kbd> (macOS) / <kbd>Ctrl+Alt+Shift+L</kbd> (Windows/Linux). The options here will vary depending on which type of code you're working with so try it out and see what you can learn!

![reformat-options.png](reformat-options.png)
