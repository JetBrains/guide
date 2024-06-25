---
date: 2024-06-24
title: Goroutines Profiler Labels
topics:
  - go
author: mm
subtitle: Advance beyond the current line of code and move on to the next line.
seealso:
  - title: How to Find Goroutines During Debugging
    href: >-
      https://blog.jetbrains.com/go/2020/03/03/how-to-find-goroutines-during-debugging/
  - title: Using profiler labels
    href: >-
      https://www.jetbrains.com/help/go/using-profiler-labels.html

thumbnail: ./thumbnail.png
video: https://www.youtube.com/watch?v=-lZMpvujpCs
---

Goroutines are integral to nearly all Go programs. However, employing numerous goroutines can complicate debugging efforts.

Starting from Go 1.9, you have the ability to capture extra information to understand the execution flow. This includes recording any labels you choose as part of profiling data, which can be later be utilized to analyze profiler outputs effectively.
