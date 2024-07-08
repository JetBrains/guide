---
date: 2024-07-08
title: Vulnerable API Usage
topics:
  - java
  - security
  - inspections
author: md
subtitle: See whether you are using the vulnerable API of a dependency.
thumbnail: ./thumbnail.png
seealso:
  - title: (documentation) IntelliJ IDEA Help - Find vulnerable APIs
    href: "https://www.jetbrains.com/help/idea/package-analysis.html#find-vulnerable-api"
  - title: (documentation) IntelliJ IDEA Help - Analyze code to find all vulnerable dependencies
    href: "https://www.jetbrains.com/help/idea/package-analysis.html#find-vulnerable-api"
  - title: (video) Is your code vulnerable?
    href: "https://www.youtube.com/watch?v=4iD5Q3tFiEI"
  - title: "(video) Enhance Code Safety: Unveiling IntelliJ IDEA’s New Exploitable Path Feature"
    href: "https://www.youtube.com/watch?v=eLKsm0OpwN8"
video: "https://youtu.be/BULaXBvOMh8"
---

When dependencies in your project have known vulnerabilities, how do you know whether you're actually using the vulnerable part of a dependency? Use IntelliJ IDEA's Vulnerable API Usages inspection to find out!

If we are looking at code that calls the vulnerable API of a dependency, this code will be highlighted in the editor. When we hover over the highlighted code, we see a list of vulnerabilities found in this API call.
We can show context actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and select **Go to file with declared dependency** from the menu. This will navigate to the part of our build file where the vulnerable dependency is declared. Here we can use <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) again to upgrade to an unaffected version (if one is available).
