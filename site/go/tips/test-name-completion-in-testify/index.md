---
date: 2025-05-15
title: Completion for Testify Test Names
topics:
  - go
  - testing
author: dlsniper
subtitle: Let your IDE add constructor arguments to your instance.
thumbnail: ./thumbnail.png
video: "./completion_testify_names.webm"
---

Type _Run_ and the IDE will suggest _suite. Run_ as a completion option. When you select that, the IDE will automatically complete the line to _suite.Run(t, |)_. You can then start typing the testify suite name at the caret position, _|_
