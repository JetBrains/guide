---
date: 2021-07-06
title: Run tests before commit
topics:
  - platform
  - vcs
author: dlsniper
subtitle: Make sure your tests pass before reaching the CI/CD pipeline
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: >-
  https://www.youtube.com/watch?v=Uq79t_XpWkc&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=122
---

**How to use:**

Invoke the _Commit_ feature using <kbd>⌘K</kbd> (macOS) / <kbd>Ctrl+K</kbd> (Windows/Linux), then select the **Commit options** and check the **Run Tests** option, then select which test configuration you wish to run.

**Note:** You must have the _Use non-modal commit interface_ activated before you can use this feature. Check your settings under **Settings/Preferences | Version Control | Commit**.

**Pro-tip:** You can use the [Compound configuration type](https://www.jetbrains.com/help/go/run-debug-configuration.html#compound-configs) to run more than a single run configuration.
