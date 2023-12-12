---
date: 2022-11-08
title: Generate 'go.work' for a project
topics:
  - editing
  - go
author: ap
subtitle: >-
  Generate 'go.work' by using the context menu or a quick-fix with 'replace'
  directives
seealso:
  - title: (documentation) GoLand Help - Go workspaces
    href: "https://www.jetbrains.com/help/go/2022.3/go-workspaces.html"
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/tUkadNzfrl8"
---

Right-click the root folder of your project and navigate to **New | Go Workspace File**. When you select it, a _go.work_ file will appear in your root folder. Existing Go modules will automatically be added to the _go.work_ file.

Also, you can generate _go.work_ from _go.mod_ if you have _replace_ directives there. Place the caret on a _replace_ directive, press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) to see all available intention actions, and select the **Generate ‘go.work’ using ‘replace’ directives** quick-fix.
