---
date: 2023-05-12
title: Move Work Aside with Stash
topics:
  - git
  - vcs
author: pwe
subtitle: Use Git's stash to move uncommitted work to one side, temporarily.
seealso:
  - title: Stash changes
    href: >-
      https://www.jetbrains.com/help/idea/work-on-several-features-simultaneously.html
thumbnail: ./thumbnail.png
obsoletes:
  - /dotnet/tips/move-aside-stash/
  - /go/tips/move-aside-stash/
  - /java/tips/move-aside-stash/
  - /python/tips/move-aside-stash/
  - /javascript/tips/move-aside-stash/
video: "https://www.youtube.com/watch?v=rQXUSI50uhs"
---

## The Problem

You’re on a feature branch with some unfinished work, as we see in the commit window.
A colleague asks: “Can you fix something on main”?

You switch to main and -- crap.
The feature branch has uncommitted work.

“Force Checkout”?
Means losing our work.
“Don’t Checkout”.
That’s like “cancel” for branch change.
“Smart Checkout”? Let’s click that.

But that triggers a merge conflict and applies your changes to main.
If you commit, it’s going in too.

Let’s start back at the top.
Your branch has uncommitted work.
You could do a commit, and maybe squash later to clean up history.
Or, you could throw away all of your work, switch to main, come back and re-type everything.

Not a lot of good options.

## The Solution

The IDE has a solution for this!
Start on the feature branch, with the uncommitted work.
You can move that work aside temporarily using Git’s “stash” facility.
You can get to it with the Git menu, under “Uncommitted Changes”.

Let’s use the keyboard instead.
Search Everywhere, then search for Stash and hit enter.
In the Stash dialog, provide a name and click “Create Stash”:
Next, switch to the main branch, make the change, then commit.
Then, go back to the feature branch.

Let’s get the unfinished work back.
Invoke “Search Everywhere” and search for “Unstash Changes”.
This lists your stashes.
It also has some controls for managing your stashes.

Select your work-in-progress and click “Pop Stash” to delete the stash after applying it.
Then click the “Pop Stash” button.

Unlike shelve, stashes can be reached outside the IDE, for example the git command line.
But it doesn’t work when the target branch is “dirty” (uncommitted changes) and doesn’t let you choose which parts to stash.
It’s all or nothing.
