---
date: 2025-01-09
title: "Non-local break & continue"
topics:
  - kotlin
author: sebastianaigner
subtitle: Making inline lambdas truly first-class citizens
thumbnail: ./thumbnail.jpg
video: "https://www.youtube.com/watch?v=B-Les-S8Flw"
linkURL: "https://www.youtube.com/watch?v=B-Les-S8Flw"
---

We’re making a change to Kotlin that makes inline lambdas truly first-class language constructs, and makes them truly seamless to use. We do so by addressing a long-standing inconsistency when it comes to using break and continue inside lambdas.

In short: Kotlin becomes more consistent! And it does so by now experimentally supporting break and continue statements in a non-local manner, analog to nonlocal return expressions. This gets you more flexibility when you’re writing code where you have loops combined with inline functions that have lambda parameters – plus it finally makes inline lambdas real first-class language constructs.

This becomes super useful when you work with scope functions like let, apply, run, also, and with, when you work with mutexes or locks in Kotlin coroutines, or when you work with the Result type to do more functional error handling!
