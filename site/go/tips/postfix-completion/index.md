---
date: 2025-05-23
title: Postfix Completion
topics:
  - completion
  - go
author: dlsniper
subtitle: Transform an expression into another one.
thumbnail: ./thumbnail.png
video: "./postfix_completion.webm"
---

_Postfix Completion_ lets you transform an expression into another one, based on the postfix you specify after the dot, the current context, and the expression type.

For example, you can turn a bool expression into an if statement, or create a pointer to an expression. If anything goes not as planned, everything can be reverted via simple <kbd>⌘Z</kbd> (macOS) / <kbd>Ctrl+Z</kbd> (Windows/Linux).

Open the _Postfix Completion_ page via _Settings/Preferences | Editor | General_ to see the complete list of supported templates.

- _Postfix Completion_ options are displayed as a part of the `Basic Completion` suggestions list. Press <kbd>Ctrl+J</kbd> on Windows/Linux, or <kbd>⌘J</kbd> on macOS to see a full list of the _Postfix Completion_ templates applicable in the current context.
- You can change the names of all _Postfix Completions_ in the Settings/Preferences dialog.
- In the same dialog, you can also disable the templates you don't need, or even turn off _Postfix Completion_ completely.
