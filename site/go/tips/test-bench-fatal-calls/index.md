---
date: 2025-05-20
title: Detect Incorrect Usages of t/b.Fatal* Calls in Goroutines
topics:
  - go
  - inspections
  - testing
author: dlsniper
subtitle: >-
  Find if tests or benchmarks are using t/b.Fatal* calls inside goroutines
  incorrectly
thumbnail: ./thumbnail.png
video: "./detect_tfatal.webm"
---

Calling \*t/b.Fatal\*\* methods from a goroutine are not advised as it may produce unexpected behavior.

You don't need to do anything to run this inspection as it's enabled by default.

Open your tests or benchmarks and see if it catches any issues.
