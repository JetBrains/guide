---
date: 2025-05-24
title: Inline Watches in Debugger
topics:
  - debugging
  - go
author: dlsniper
subtitle: Keep your eyes on the code at all times.
thumbnail: ./thumbnail.png
video: "./inline_watches.webm"
---

During debugging, you can keep your eyes on the code at all times, without having to check the Debugger tool window for the values of variables that you are interested in.

The best part? When you move away to a different scope, if the variable is not contained by it, it won't be shown in the Debugger tool window either.

During a debugging session, right-click on any variable you'd like to watch and select **Add inline watch** from the context menu.
