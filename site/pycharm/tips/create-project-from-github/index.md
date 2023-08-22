---
date: 2019-04-17
title: Create a Project from GitHub
topics:
  - vcs
author: pwe
subtitle: Let PyCharm do the work to clone and setup a project hosted on GitHub.
seealso:
  - title: Check out a project
    href: >-
      https://www.jetbrains.com/help/pycharm/manage-projects-hosted-on-github.html#clone-from-GitHub
  - title: PyCharm Help for GitHub
    href: "https://www.jetbrains.com/help/pycharm/github.html"
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://www.youtube.com/watch?v=ukbvdF5wqPQ"
---

We all consume a lot of code. Alas, it's a number of steps to get all that
code from GH, into a directory, and opened in the IDE.

Let the IDE help out. If you have your GitHub credentials in your preferences,
a few easy steps in the IDE will get you going.

First, in the PyCharm menu, choose `VCS | Checkout from Version Control | Git`.
You can also skip the keyboard by invoking `Find Action` and speed searching for
`ch ve`.

This brings up the `Clone Repository` dialog. In the URL field, speed search
some letters in the repo name. The IDE looks across all the organizations that
you are in, your personal account, and repos that you're a collaborator for.

If the repo you want isn't on GitHub, paste a URL in here.

In the directory field, supply the path and name of the directory this should
clone into.

After answering the dialogs to get the repo and open in a window, your project
is ready.
