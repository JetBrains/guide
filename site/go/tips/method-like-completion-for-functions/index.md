---
date: 2025-05-23
title: Method-like Completion for Functions
topics:
  - completion
  - go
author: dlsniper
subtitle: >-
  Completion for searching for functions that accept parameters of a certain type.
thumbnail: ./thumbnail.png
video: "./method_like_completion.webm"
---

_Method-like completion_ for functions allows you to search for functions based on their first parameter.

Imagine you are new to Go and want to split a string.

You know that there must be a function for that, most likely it's called `Split` and accepts a string as the first argument, but you don't know the exact name of the function and its package.

Here's where method-like completion comes in handy, offering you a list of all suitable functions, automatically importing it upon selection.

Hold down the <kbd>Ctrl</kbd> key and press <kbd>Space</kbd> twice.
