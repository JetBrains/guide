---
type: TutorialStep
date: 2022-12-02
title: Project tool window
topics:
  - build
  - gradle
  - maven
author: md
subtitle: View dependencies in the Project tool window
thumbnail: ./thumbnail.png
---

In the _Project_ tool window, <kbd>⌘1</kbd> (macOS) / <kbd>Alt+1</kbd> (Windows/Linux), under _External Libraries_ we can see all the JAR files needed by our application, including the transitive dependencies. However, we cannot tell the difference between direct dependencies and transitive dependencies. One declared dependency might bring in multiple JAR files.

![Project tool window](project-tool-window.png)
