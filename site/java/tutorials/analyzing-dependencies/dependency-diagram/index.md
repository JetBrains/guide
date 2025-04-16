---
type: TutorialStep
date: 2023-05-05
title: Dependency Diagram
topics:
  - build
  - gradle
  - maven
author: md
subtitle: Using the Dependency Diagram in IntelliJ IDEA Ultimate.
thumbnail: ./thumbnail.png
---

If you are using IntelliJ IDEA Ultimate, you can also view your dependencies as a diagram.

## Show Diagrams

We can open diagrams either by right-clicking the project in the _Project_ tool window and selecting **Diagrams | Show Diagrams**, or by using the shortcut <kbd>⌥⇧⌘U</kbd> (macOS) / <kbd>Ctrl+Alt+Shift+U</kbd> (Windows/Linux). You'll notice this gives you several diagram options to choose from. In this case, we're interested in the _Gradle Dependencies_, so we select that one. We can hide all tool windows <kbd>⌘⇧F12</kbd> (macOS) / <kbd>Ctrl+Shift+F12 (Windows/Linux)</kbd>, so we can focus on the diagram.gut

![Diagrams | Show Diagrams](show-diagram.png)

![Gradle Dependencies](gradle-dependencies.png)

## Zoom in

If the project we're looking at pulls in a lot of transitive dependencies, like this example, the diagram can be quite large. We can zoom in and out using the + and - keys, or the + and - buttons in the diagram window.

![Dependency Diagram](dependency-diagram.png)

![Zoom in](zoom-in.png)

## Finding a specific dependency

To look for a specific dependency and see where we get it from, we can search for this dependency using <kbd>⌘F</kbd> (macOS) / <kbd>Ctrl+F</kbd> (Windows/Linux) to find it in the diagram. Using **Show Paths: Root -> Selection**, we can check the path for this dependency and click related dependencies to follow the path to the root.

![Find Elements in Diagram](find-elements.png)

![Show paths](show-paths.png)

![Root](root.png)

## Focus on related nodes

We have other options to look into specific dependencies. For example, we can zoom in on a specific dependency and the related nodes. Right-click the dependency you're interested in, and from the context menu, select **Analyze graph | Focus on Node Neighbourhood**. This will give you several options. In this example, we'll look at both directions. When we are done, we can reopen **Analyze graph** context menu and select **Drop focus**.

![Analyze Graph](analyze-graph.png)

![Focus View On Node Neighbourhood](focus-view.png)

![Drop Focus](drop-focus.png)

## Select scopes

We can change the visibility level, by clicking **Change Visibility Level** for example if we want to focus on compile or runtime dependencies only.

![Change Visibility Level](change-visibility-level.png)

![Visibility Levels](visibility-levels.png)
