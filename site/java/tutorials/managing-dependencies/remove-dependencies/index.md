---
type: TutorialStep
date: 2023-01-06
title: Remove dependencies
topics:
  - build
  - gradle
  - maven
  - packagesearch
author: md
subtitle: Remove dependencies using Package Search
thumbnail: ./thumbnail.png
---

Finally, we can remove dependencies we no longer need. In the _Dependencies_ tool window, let's remove jackson-databind from the Java module. We select the dependency we want to remove (jackson-databind) and in the Dependency details pane on the right, click **More** (three dots) and select **Remove**.

![Remove Dependency](remove-dependency.png)

We will see that the dependency is removed from the pom.xml and the dependency list. To remove a dependency from the whole project, select **All Modules** on the left.

**Note:** If you cannot find the _Dependencies_ tool window, make sure the [Package Search](https://plugins.jetbrains.com/plugin/12507-package-search) plugin is installed.
