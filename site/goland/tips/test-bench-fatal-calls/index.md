---
date: 2021-05-24
title: Detect incorrect usages of t/b.Fatal* calls in goroutines
topics:
  - go
  - inspections
  - testing
author: dlsniper
subtitle: >-
  Find if tests or benchmarks are using t/b.Fatal* calls inside goroutines
  incorrectly
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: >-
  https://www.youtube.com/watch?v=NEtGV-cfoJM&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=33
---
Calling *t/b.Fatal\** methods from a goroutine is not advised as it
may produce unexpected behavior.

**How to use:**
You don't need to do anything to run this inspection as it's
enabled by default.

Open your tests or benchmarks and see if it catches any issues.

<span class="tag is-rounded">New in 2021.1</span>
