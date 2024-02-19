---
date: 2021-05-10
title: Use new methods on the Streams API
topics:
  - inspections
  - java
author: tg
subtitle: Inspections can show us new features from Java 16
thumbnail: ./thumbnail.png
seealso:
  - title: (video) Good Old Stream API - JetBrains Technology Day for Java
    href: "https://www.youtube.com/watch?v=nklbYYQpQi8"
video: "https://youtu.be/4XkazKdTO1U"
---

Java 16 introduced some new methods on the Streams API. IntelliJ IDEA shows us places that can use the new methods and can automatically convert the code to use these new methods.

The code will be highlighted in yellow as a warning. Press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and choose "Replace collect(toUnmodifiableList()) with toList()".
