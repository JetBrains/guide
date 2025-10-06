---
date: 2025-08-06
title: "Context-sensitive resolution in Kotlin 2.2"
topics:
  - kotlin
author: martonbraun
subtitle: Write the same code with fewer qualifiers
thumbnail: ./thumbnail.jpg
video: "https://www.youtube.com/watch?v=aF8RYQrJI8Q"
linkURL: "https://www.youtube.com/watch?v=aF8RYQrJI8Q"
---

Kotlin 2.2 makes the compiler even smarter by introducing context-sensitive resolution as an experimental feature. This improvement lets you use enum entries and similar “static” values, as well as types from sealed hierarchies without having to qualify them with the containing type, whenever that’s already obvious from the context.
