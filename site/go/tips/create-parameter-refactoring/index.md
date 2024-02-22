---
date: 2023-11-22
title: Introduce parameters from unresolved references in your code
topics:
  - go
  - refactoring
author: ap
subtitle: >-
  Change a function or method signature by introducing parameters directly from
  unresolved references
thumbnail: ./thumbnail.png
---

The **Create Parameter** quick-fix for unresolved references allows you to create parameters directly from unresolved references in your code.

**How it Works:**

Locate a reference in your code that is currently unresolved (indicated by red code). Click a light bulb icon that will appear near the unresolved reference or use the keyboard shortcut <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) to open the quick-fix options. Select the **Create Parameter** quick-fix. Modify the automatically suggested settings for the parameters in the **Change Signature** dialog and click **Refactor**. The IDE will add new parameters to a function or method signature.

<img src="screenshot.png" alt="Code coverage for applications" title="Code coverage for applications" width="706"/>
