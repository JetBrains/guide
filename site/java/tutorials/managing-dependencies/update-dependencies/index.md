---
type: TutorialStep
date: 2023-01-06
title: Upgrade dependencies
topics:
  - build
  - gradle
  - maven
  - packagesearch
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

We can also upgrade our dependencies using the _Dependencies_ tool window. The _Dependencies_ tool window will tell us if there’s a newer version of a dependency, as we can see here.

![Dependencies with newer versions](dependencies-with-upgrades.png)

**Note:** If you cannot find the _Dependencies_ tool window, make sure the [Package Search](https://plugins.jetbrains.com/plugin/12507-package-search) plugin is installed.

We can choose the version to upgrade to by clicking on the version number in the list. Note that we don’t have to use the latest version.

![Select version](select-version.png)

We can also automatically upgrade a dependency to the latest version by clicking **Upgrade** for that particular dependency.

![Upgrade individual dependency](upgrade-individual.png)

Or, we can even upgrade all our dependencies at once, by clicking **Upgrade all**.

![Upgrade all dependencies](upgrade-all.png)
