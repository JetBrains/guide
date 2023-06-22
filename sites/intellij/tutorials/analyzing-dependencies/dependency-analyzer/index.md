---
type: TutorialStep
date: 2023-05-05
title: Dependency Analyzer
topics:
  - build
  - gradle
  - maven
author: md
subtitle: Using the Dependency Analyzer in IntelliJ IDEA
thumbnail: ./thumbnail.png
---

We can view our dependencies in the Maven or Gradle tool window. Here, we can expand dependencies to show their transitive dependencies, or collapse them again.

![Maven tool window](maven-tool-window.png)

## Open the Dependency Analyzer
We can open the Dependency Analyzer from the Maven or Gradle tool window by clicking the **Analyze Dependencies…** button. This will open the Dependency Analyzer showing the Resolved Dependencies on the left and their Usages on the right.

![Analyze Dependencies button](analyze-dependencies-button.png)

Alternatively, we can right-click a dependency in the Maven or Gradle tool window and select **Analyze Dependencies** from the context menu. This will open the Dependency Analyzer with the dependency selected.

![Analyze Dependencies](analyze-dependencies.png)

We can hide all tool windows (**⇧⌘F12** on macOS / **Control+Shift+F12** on Windows/Linux), so we can focus on the dependencies.

## Viewing dependencies in the Dependency Analyzer
![Dependency Analyzer](dependency-analyzer.png)

We can view the dependencies as a tree by clicking the **Show as Tree** button and **Expand** or **Collapse** them as needed by pressing the corresponding buttons. 

![Show as Tree](show-as-tree.png)

We can also click the **View Options** button and toggle **Show GroupId**, to show the GroupId for dependencies or not.

![View Options](view-options.png)

## Finding a specific dependency
To see where we are getting a specific version of a particular library, we can search for that dependency. For example, when we search for "log4j" we see that we are only getting it via this spring-boot-starter, and it's a version newer than the one where log4shell was fixed.

![Search for a specific dependency](search.png)

## Finding conflicts
We might only want to look at dependencies that have conflicts. When we select the **Show Conflicts Only** button, we see only dependencies that have conflicts. In this example, we see that there is a conflict with the checker framework dependency. Fortunately, it's been resolved; we see that one version is greyed out. If we go back to the Maven tool window, we see that this version has been omitted for conflict. We can see that the version we are using is 3.5.0 which we get from postgres.

![Show Conflicts Only button](show-conflicts-only-button.png)

![Show Conflicts Only result](show-conflicts-only-result.png)

![Omitted for conflict](omitted-for-conflict.png)

## Selecting scopes
We can also select a scope (for example, if we want to look at our test dependencies or exclude them from analysis). Since we've opened the Dependency Analyzer from the Maven tool window, we see the Maven scopes.

![Show Maven Scopes](maven-scopes.png)

When we open the Dependency Analyzer from the Gradle tool window, the list of scopes will contain Gradle scopes.

![Show Gradle Scopes](gradle-scopes.png)

## More context
For more context, we can click a specific dependency and select **Open Maven Config** to open its pom.xml or **Go to Maven Dependency** to open the location in the pom.xml where this dependency is declared.

![Open Maven Config](open-maven-config.png)




