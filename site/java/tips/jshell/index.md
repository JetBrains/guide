---
date: 2024-11-29
title: JShell
topics:
  - tricks
  - java
author: md
subtitle: Use JShell in IntelliJ IDEA to quickly evaluate Java expressions.
thumbnail: ./thumbnail.png
seealso:
  - title: (documentation) IntelliJ IDEA Help - JShell Console
    href: "https://www.jetbrains.com/help/idea/jshell-console.html#JShell_Console.topic"
video: "https://youtu.be/ab5CJa8vNYM"
obsoletes:
  - /java/tips/inlay-hints-for-errors/
---

JShell is a java REPL tool introduced in JDK 9. You can use it to interactively evaluate Java expressions quickly, without any overhead.

Open JShell in IntelliJ IDEA either from the main menu **Tools | JShell Console**, or by using **Search Everywhere** <kbd>⇧⇧</kbd> (macOS) / <kbd>Shift+Shift</kbd> (Windows/Linux) and looking for _JShell Console_.

Type your Java code in the _JShell Console_ tab, and press <kbd>⌘⏎</kbd> (macOS) / <kbd>Ctrl+Enter</kbd> (Windows/Linux) to run this code in JShell. You will see the output of your code in the _Run_ tool window.
