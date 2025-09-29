---
date: 2025-10-01
title: Compact source file
topics:
  - java
author: md
subtitle: Create a compact source file in IntelliJ IDEA.
thumbnail: ./thumbnail.png
seealso:
  - title: (blog) IntelliJ IDEA Blog - Java 25 LTS and IntelliJ IDEA
    href: "https://blog.jetbrains.com/idea/2025/09/java-25-lts-and-intellij-idea/"
  - title: (video) Creating your first Java application with IntelliJ IDEA
    href: "https://www.youtube.com/watch?v=H_XxH66lm3U"
  - title: (documentation) IntelliJ IDEA Help - SDKs
    href: "https://www.jetbrains.com/help/idea/sdk.html"
video: "https://youtu.be/u4RaUDB4Pho"
callToAction:
  url: "/java/tips/java-compact-file/"
  message: "Did you know there is another way to create a compact source file in IntelliJ IDEA?"
---

Compact source files were introduced in Java 25. To create a compact source file, right-click the **Project** tool window (or press <kbd>⌘N</kbd> (macOS) / <kbd>Alt+Ins</kbd> (Windows/Linux)) and select **New | Java Class**. In the **New Java Class** popup, select the option **Compact source file**.

This compact source file is created in the root directory of your project, even if you create it from another package. IntelliJ IDEA automatically adds an instance main method `void main()` to the file.

{% cta %}
