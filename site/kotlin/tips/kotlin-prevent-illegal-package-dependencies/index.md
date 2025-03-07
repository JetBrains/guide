---
date: 2021-05-11
title: Prevent a Package Depending Upon Another
topics:
  - inspections
  - kotlin
author: tg
subtitle: >-
  Enforce architecture rules, such as data access layers not depending upon UI layers.
thumbnail: ./thumbnail.png
seealso:
  - title: (documentation) IntelliJ IDEA Help - Code inspections
    href: "https://www.jetbrains.com/help/idea/code-inspection.html"
video: "https://youtu.be/7-A0Fn4fgQ8"
obsoletes:
  - /java/tips/kotlin-prevent-illegal-package-dependencies/
---

Kotlin developers can configure an inspection to define illegal package dependencies, which can prevent code from accidentally depending upon the wrong packages, for example the UI layer talking directly to the data access layer.
