---
date: 2025-10-01
title: Module Import
topics:
  - settings
  - java
author: md
subtitle: Using module import in IntelliJ IDEA.
thumbnail: ./thumbnail.png
seealso:
  - title: (blog) IntelliJ IDEA Blog - Java 25 LTS and IntelliJ IDEA
    href: "https://blog.jetbrains.com/idea/2025/09/java-25-lts-and-intellij-idea/"
video: "https://youtu.be/JE_X0KaklVY"
---

Java 25 introduces module imports. When adding a module import, use **Jump Down** to see the contents of the module.
When using **Optimized Imports**, IntelliJ IDEA will automatically remove any imports that are added by the module import.
If you prefer to use single class imports, invoke Context Actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and select **Replace with single class imports**.

If desired, it is possible to delete unused module imports when using **Optimized Imports**. To configure this option, open **Settings | Editor | Code Style | Java** and go to the **Imports** tab. Select the option **Delete unused module imports**. When this option is selected, **Optimized Imports** will remove unused module imports.
