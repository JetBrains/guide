---
hasBody: true
date: 2023-05-11
title: Move Work Aside With Shelve
technologies: []
topics: [vcs]
author: pwe
subtitle: Move uncommitted work aside when you need to work on another branch.
seealso:
  - title: Shelve and unshelve changes
    href: https://www.jetbrains.com/help/idea/shelving-and-unshelving-changes.html
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
shortVideo:
  url: https://www.youtube.com/watch?v=L02P_Qa62oQ
leadin: |

    You’re on a feature branch with some unfinished work. 
    Colleague asks: “Can you fix something on main”?

    Use the IDE's shelve feature to temporarily move unfinished work aside, then move it back.
---

## The Problem

You’re on a feature branch with some unfinished work, as we see in the commit window.
A colleague asks: “Can you fix something on main”?

You switch to main and -- crap.
The feature branch has uncommitted work.
The IDE offers to help, but: what are the consequences?

“Force Checkout”?
Means losing our work.
“Don’t Checkout”?
That’s like “cancel” the branch change.
“Smart Checkout”?
Let’s click that.
But that triggers a merge conflict and applies your changes to main.

Let’s start back at the top.
Your branch has uncommitted work.
You could do a commit, and maybe squash later to clean up history.
Or, make a commit message saying “WIP Before fixing main all broken lolz.”

You could throw away all of your work, switch to main, come back and re-do it.

Not a lot of good options.

## The Solution

We'll begin on the feature branch with the uncommitted work.

We can move that work aside temporarily using the IDE’s “shelve” facility.
Click the “Shelve Silently” button to move things out of the way.
Afterward, the Commit window shows there are no uncommitted changes.

Where did that work go?
Take a look at the Shelf tab.
Under “Changes”, we see that unfinished work.

We can safely switch to the main branch, make the change, commit.
hen, go back to the feature branch and use “Unshelve Silently” to take the work off the shelf and resume where you left off.

Back on the Commit tab, you see -- everything is back where you started, with the uncommitted work.

If you want more control, you can shelve just parts of the uncommitted work to a specially-named shelf.
It's almost like a branch.

On the Shelf tab, you see a new shelf, with the name you gave.
It has the changes.
You can un-shelve it and choose the place – an IDE changelist – to unshelve it to.

And, we’re back where we started.

Shelve only works within the IDE, so don’t use it if other tools are involved.
Use it if you need to pick out parts to move aside, or if you don’t want to deal with conflicts.
