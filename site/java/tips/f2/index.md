---
date: 2023-12-05
title: Go to Next Error
topics:
  - editing
  - inspections
  - java
author: md
subtitle: Quickly move to the next (or previous) error or warning in the file.
thumbnail: ./thumbnail.png
seealso:
  - title: "(video) IntelliJ IDEA Pro Tips: Move to the Next Issue"
    href: "https://www.youtube.com/watch?v=9nAvkNBYZwY"
  - title: (documentation) IntelliJ IDEA Help - Navigate between errors or warnings
    href: >-
      https://www.jetbrains.com/help/idea/navigating-through-the-source-code.html#navigate-errors-warnings
  - title: (blog) IntelliJ IDEA Blog - Top 15 IntelliJ IDEA Shortcuts
    href: "https://blog.jetbrains.com/idea/2020/03/top-15-intellij-idea-shortcuts/"
  - title: (guide) IntelliJ IDEA Guide - Alt+Enter
    href: ../alt-enter/
video: "https://youtu.be/Q26Cc6V7zKk"
callToAction:
  {
    url: "/java/tips/problem-window/",
    message: "You can check out your Problem tool window to see any errors in your project.",
  }
---

When you open a source file in the editor, you may see warnings or errors in this file. You can quickly step through to check all these issues without having to use the mouse, just press <kbd>F2</kbd> (macOS) / <kbd>F2</kbd> (Windows/Linux).

While you're coding, you may want to jump to the next error or warning <kbd>F2</kbd> (macOS) / <kbd>F2</kbd> (Windows/Linux) or the last one <kbd>⇧F2</kbd> (macOS) / <kbd>Shift+F2</kbd> (Windows/Linux). This way, you can quickly hop to the next thing that needs fixing or addressing without having to move your hand to the
mouse.

Combine this with <kbd>Alt+Enter</kbd> (Windows/Linux) to quickly see the suggested solution to the problem and apply a fix. This will show a list of suggested solutions, as we saw in the [tip about Context Actions](../context-actions/),
and we can pick the solution that suits us best.

If you're confident IntelliJ IDEA has the correct fix for the problem, you can skip the step of listing the solutions. Press <kbd>F2</kbd> (macOS) / <kbd>F2</kbd> (Windows/Linux) to navigate to the problem, then press <kbd>⌥⇧⏎</kbd> (macOS) / <kbd>Shift+Alt+Enter</kbd> (Windows/Linux), to accept IntelliJ IDEA's suggested fix.

![Accept suggested fix](accept-suggestion.png)

{% cta %}
