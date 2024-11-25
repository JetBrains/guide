---
type: TutorialStep
date: 2023-01-06
title: Upgrade dependencies
topics:
  - build
  - gradle
  - maven
author: md
subtitle: Upgrade dependencies using Package Search.
thumbnail: ./thumbnail.png
---

We will also need to keep our dependencies up to date. To show you how IntelliJ IDEA can help, we are using this extremely outdated project as an example. In the pom.xml below, we see that several dependencies are marked with squiggly lines underneath them.

![Outdated Dependencies in pom.xml](pom-xml-outdated-dependencies.png)

IntelliJ IDEA will show the suggestion to upgrade when we hover over the dependency, and we can click the suggestion to upgrade the dependencies.

![Hover over outdated dependency](hover.png)

Alternatively, we can use Context Actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) to upgrade these dependencies.

![Context Actions](context-action.png)
