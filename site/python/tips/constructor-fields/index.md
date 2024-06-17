---
date: 2024-06-17
title: Adding Fields In a Constructor
topics:
  - editing
author: hs
subtitle: Let your IDE add constructor arguments to your instance.
thumbnail: ./thumbnail.png
video: ./tip.webm
---

## The Problem

It's one of those chores...your class has an `__init__` with some arguments, and you need to assign them to `self`. What a lot of typing.

## The Solution

Let the IDE do it for you. As you type the argument name, press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and choose **Add 'field' to constructor**.

![add-field-constructor.png](add-field-constructor.png)

PyCharm will create the assignment for you.
