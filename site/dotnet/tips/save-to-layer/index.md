---
date: 2020-01-29
title: Settings Layers
topics:
  - .net
  - editing
  - ide
  - resharper
  - rider
author: matkoch
subtitle: Save settings to the scope you need them!
thumbnail: ./thumbnail.png
animatedGif:
  file: ./guide.webm
  width: 500
  height: 314
---

**Working in a team or at different places?** 👥 🖥

Whenever we change settings, we can decide where they should be persisted. There are _3 layers by default_: local machine, solution team-shared, and solution personal. Settings like code formatting or code inspections are particularly suitable to be saved in the team-shared layer and committed to the repository. Doing so ensures that our code is always consistently structured and allows our CI to use `inspectcode.exe` to create an _insightful report_ for existing code smells.

Let's keep our code base shiny! ☀️🌈

### See Also

- [Establishing a Zero-Warning Policy](https://blog.jetbrains.com/dotnet/2016/10/04/establishing-a-zero-warning-policy-with-resharpers-solution-wide-analysis/)
- [ReSharper - Manage and Share settings](https://www.jetbrains.com/help/resharper/Sharing_Configuration_Options.html)
- [Rider - Introducing settings layers](https://blog.jetbrains.com/dotnet/2017/02/20/rider-eap-update-code-style-settings-layers/)
