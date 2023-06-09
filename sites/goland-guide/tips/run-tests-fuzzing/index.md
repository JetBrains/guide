---
date: 2022-07-05
title: 'Fuzz testing'
technologies: ['go']
topics: ['testing']
author: ap
subtitle: Automate your tests by continuously submitting various input.
seealso:
  - title: GoLand Documentation – Fuzz testing
    href: https://www.jetbrains.com/help/go/2022.2/performing-tests.html#run-fuzz-testing
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
screenshot: ./screenshot.png
leadin: |
    **Fuzz testing** allows you to check your code against the various generated data. If fuzz testing fails, you can always see the reason in the _testdata_ directory.

    **How to use:**
    
    In the __test_ file, click the **Run Test** icon in the gutter and navigate to **Run | go test -fuzz FuzzMyTest**.

    <span class="tag is-rounded">New in 2021.2</span>
---
