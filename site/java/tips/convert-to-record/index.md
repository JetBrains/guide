---
date: 2024-07-17
title: Convert Class to Record
topics:
  - editing
  - inspections
  - java
author: md
subtitle: Use inspections to convert classes to Java 16 records.
thumbnail: ./thumbnail.png
seealso:
  - title: (video) Using Java 15 with IntelliJ IDEA
    href: "https://www.youtube.com/watch?v=IvytsoAUEZA"
  - title: (documentation) IntelliJ IDEA Blog - Java 16 and IntelliJ IDEA
    href: "https://blog.jetbrains.com/idea/2021/03/java-16-and-intellij-idea/"
video: "https://youtu.be/qV4Y11AkH38"
callToAction:
  url: "/java/tips/convert-from-record/"
  message: "Naturally, you can convert code from a record too!"
---

IntelliJ IDEA can identify classes that are data holders and can be converted to records. The class will be highlighted with a warning (yellow underline) - press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and IntelliJ IDEA will suggest converting the class to a record.

The fields will be become record components, the constructor and accessors will be removed. If we had equals, hashCode and toString methods on our class, we can optionally remove these and rely on the default record implementation.

{% cta %}
