---
date: 2024-07-17
title: Evaluate JSON Path Expressions
topics:
  - editing
  - json
author: md
subtitle: Use IntelliJ IDEA to check if your JSON Path expression are correct.
thumbnail: ./thumbnail.png
video: "https://youtu.be/Cc4N97ST4UM"
---

IntelliJ IDEA comes with support for [JSONPath](https://goessner.net/articles/JsonPath/) expressions. You can open up a window to evaluate JSONPath expressions by going to Edit -> Find -> "Evaluate JSONPath Expression...", or by opening the context menu in the editor and selecting "Evaluate JSONPath Expression...". If a JSON file is open, it will use this file to evaluate the expression.

If you have JSONPath expressions as Strings in code, use "[inject language](https://www.jetbrains.com/help/idea/using-language-injections.html)" and say this is a JSONPath expression. You'll get code formatting and completion inside this string.

You can evaluate a JSONPath expression to check it. This will open up a tool window: enter a snippet of JSON into the input and try out if an expression finds the expected path.
