---
type: TutorialStep
date: 2023-07-10
title: Making changes to code
technologies: [git]
topics: [vcs]
author: md
subtitle: Making and committing our changes
thumbnail: ./thumbnail.png

---

Before making any changes, we'll want to make sure that we can build the project. Hopefully, how to build the project will be described in the **README**, as it is for this example. Let’s open the terminal and build the project as described. In this example, we need Docker, which is already installed and running.

![Build the project](build-project.png)

Now that we know we can build the project, we can start making changes. First, we need to look for the right place to make the change. We might navigate the project in the **Project tool window** (**⌘1** on macOS, or **Alt+1** on Windows/Linux), or look for a specific file or code snippet using **Find in Files** (**⌘⇧F** on macOS, or **Ctrl+Shift+F** on Windows/Linux).

![Project tool window](project-tool-window.png)

![Find in files](find-in-files.png)

We might want to create a specific branch for our changes.

Once we are done making our changes and the project still builds, we can **commit our changes** (**⌘K** on macOS, or **Ctrl+K** on Windows/Linux). We can check our changes in the **Commit tool window** (**⌘1** on macOS, or **Alt+1** on Windows/Linux) to see if these are the right files and use **Show Diff** (**⌘D** on macOS, or **Ctrl+D** on Windows/Linux) to see if the changes are correct.

![Commit changes](commit-window.png)

![Check the differences](show-diff.png)

If we don’t have access to the original project, we need to push our code to our fork.

![Push](push.png)

