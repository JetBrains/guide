---
date: 2022-07-05
title: Fuzz testing
topics:
  - go
  - testing
author: ap
subtitle: Automate your tests by continuously submitting various input.
seealso:
  - title: (documentation) GoLand Help - Fuzz testing
    href: >-
      https://www.jetbrains.com/help/go/2022.2/performing-tests.html#run-fuzz-testing
thumbnail: ./thumbnail.png
screenshot: ./screenshot.png
---

Fuzz testing allows you to check your code against the various generated data. If fuzz testing fails, you can always see the reason in the _testdata_ directory.

In the `\_test` file, click the **Run Test** icon in the gutter and navigate to **Run | go test -fuzz FuzzMyTest**.
