---
date: 2022-07-14
title: Delete a Type Parameter with an Empty Parameter List
topics:
  - editing
  - generics
  - go
  - quick-fixes
author: ap
subtitle: >-
  Type parameters with empty parameter lists are reported as errors, but you have a quick-fix in GoLand to put it right.
thumbnail: ./thumbnail.png
screenshot: ./screenshot.png
---

Type parameters with empty parameter lists are highlighted as errors. So, if you type _func printInt[](i int)_, GoLand will highlight _[]_ because the IDE expects type parameters here. In this case, you can either implement type parameters or delete square brackets. To delete square brackets, try the **Delete type parameters** quick-fix.

Place the cursor on the empty parameter list (_[]_), press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux), and select **Delete type parameters**.
