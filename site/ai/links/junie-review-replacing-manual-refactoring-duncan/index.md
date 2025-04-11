---
date: 2025-04-11
title: 'Review: "Can JetBrains Junie replace manual refactoring?"'
topics:
  - ai
  - junie
  - ai-community
author: bravit
subtitle: A hands-on look at Junie’s strengths and limits in real-world Kotlin refactoring.
thumbnail: ./thumbnail.jpg
linkURL: "https://www.youtube.com/watch?v=vN2-VUFP784"
---

I’m always happy when people use and review our tools. I’m even happier when those tools solve real problems and make their lives easier. That seems to be exactly the case in [Duncan’s video](https://www.youtube.com/watch?v=vN2-VUFP784), where he explores refactoring Kotlin code with Junie, an agentic AI tool from JetBrains.

Duncan starts with a realistic challenge: converting a mutable Bid class into an immutable data class. First, he tries it manually and shows exactly where and why it breaks. Then he asks Junie to handle it. Junie responds with a clear plan, applies the changes, runs tests, and fixes issues as they come up. It’s a solid example of how AI can support, rather than replace, the developer.

Later he tasks Junie with converting operator extension functions into class methods. Again, Junie manages it with minimal fuss, adjusting code structure and maintaining test coverage.

Throughout, Duncan gives a fair and honest view of what it’s like to work with Junie today. He points out where the tool shines, where it makes mistakes, and where human judgment is still essential. He also adds a touch of humor (and sword-fighting swivel chairs) to keep it fun.

If you’re curious about how AI fits into day-to-day development, especially in Kotlin, this is a thoughtful and entertaining watch.
