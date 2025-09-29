---
date: 2025-10-01
title: Add static import for simple IO
topics:
  - inspections
  - java
author: md
subtitle: Add a static import for simple IO methods.
thumbnail: ./thumbnail.png
seealso:
  - title: (blog) IntelliJ IDEA Blog - Java 25 LTS and IntelliJ IDEA
    href: "https://blog.jetbrains.com/idea/2025/09/java-25-lts-and-intellij-idea/"
  - title: (video) Creating your first Java application with IntelliJ IDEA
    href: "https://www.youtube.com/watch?v=H_XxH66lm3U"
  - title: (documentation) IntelliJ IDEA Help - SDKs
    href: "https://www.jetbrains.com/help/idea/sdk.html"
video: "https://youtu.be/hfSXLXqOvi4"
callToAction:
  url: "/java/tips/simple-io-live-templates/"
  message: "Did you know you can add simple IO methods with live templates?"
---

Java 25 introduces simple IO methods, such as `IO.println()` and `readln()` to make interacting with the console more convenient. To use these methods in a compact source file, you don't need to add an import. However, you can add a static import the `java.lang.IO` class if you prefer. Invoke Context Actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) on the method and select the option **Add on-demand static import for `java.lang.io`**.

{% cta %}
