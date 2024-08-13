---
date: 2021-05-10
title: Create a Correct Parent Sealed Class
topics:
  - java
author: tg
subtitle: >-
  Sealed types are a new idea for Java developers, let IntelliJ IDEA guide you in how to use them.
thumbnail: ./thumbnail.png
seealso:
  - title: (video) Using Java 16 with IntelliJ IDEA
    href: "https://www.youtube.com/watch?v=s3otQAhPNZg"
  - title: IntelliJ IDEA Blog - Java 16 and IntelliJ IDEA
    href: "https://blog.jetbrains.com/idea/2021/03/java-16-and-intellij-idea"
video: "https://youtu.be/qQveZB7zwiY"
callToAction:
  {
    url: "/java/tips/create-a-correct-sealed-child/",
    message: "You can create a sealed child too!",
  }
---

Sealed classes (a preview feature in Java 16) are a way to take control of the inheritance hierarchy of our classes. If we have a sealed class like this one, IntelliJ IDEA will tell us we need to "permit" the child class so it can extend this parent. It will also automatically make changes if it can.

Experiment with Sealed Types, use <kbd>Alt+Enter</kbd> (Windows/Linux) to see and accept suggestions.

{% cta %}
