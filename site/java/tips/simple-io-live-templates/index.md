---
date: 2025-10-01
title: Live templates for simple IO
topics:
  - editing
  - java
  - livetemplates
author: md
subtitle: Add simple IO methods using live templates.
thumbnail: ./thumbnail.png
seealso:
  - title: (blog) IntelliJ IDEA Blog - Java 25 LTS and IntelliJ IDEA
    href: "https://blog.jetbrains.com/idea/2025/09/java-25-lts-and-intellij-idea/"
  - title: "(video) IntelliJ IDEA. Helen's Take On: Writing Less Code"
    href: "https://www.youtube.com/watch?v=Sio9MdSqXZo"
  - title: (video) IntelliJ IDEA. Write Code Faster Using Live Templates
    href: "https://www.youtube.com/watch?v=ffBeoE6NBSs&t=56"
  - title: "(video) IntelliJ IDEA Pro Tips: Live Templates"
    href: "https://www.youtube.com/watch?v=XhCNoN40QTU"
  - title: (documentation) IntelliJ IDEA Help - Using Live Templates
    href: "https://www.jetbrains.com/help/idea/using-live-templates.html"
  - title: (documentation) IntelliJ IDEA Help - Creating Live Templates
    href: >-
      https://www.jetbrains.com/help/idea/creating-and-editing-live-templates.html
  - title: (documentation) IntelliJ IDEA Guide - Create a Custom Test Live Template
    href: ../../tutorials/writing-junit5-tests/live-templates-tip/
video: "https://youtu.be/5rH_00p-aKw"
callToAction:
  url: "/java/tips/static-import/"
  message: "Did you know IntelliJ IDEA has a quick-fix to add a static import for simple IO?"
---

Java 25 introduces simple IO methods, such as `IO.println()` and `readln()` to make interacting with the console more convenient. IntelliJ IDEA introduces two new live templates to use these methods: `iop` for `println()` and `ior` for `readln()`.

In addition, there are quick-fixes available to convert `IO.println()` to `System.out.println()`, and vice versa. Invoke Context Actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) on the method and select the option **Replace with `System.out.println()`** or **Replace with `IO.println()`**.

{% cta %}
