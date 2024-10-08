---
date: 2022-12-15
title: Compare With Branch
topics:
  - git
  - vcs
author: pwe
subtitle: See the changes in another branch's commits and compare them with your branch.
seealso:
  - title: Compare branches
    href: "https://www.jetbrains.com/help/idea/manage-branches.html#compare_branches"
thumbnail: ./thumbnail.png
video: "https://www.youtube.com/watch?v=7Rjl1Cerbl0"
obsoletes:
  - /dotnet/tips/compare-with-branch/
  - /java/tips/compare-with-branch/
  - /go/tips/compare-with-branch/
  - /python/tips/compare-with-branch/
  - /javascript/tips/compare-with-branch/
---

## The Problem

We saw how to [see that another branch has commits](../see-unsynced-commits).
Also, how to [browse that branch's commits](../browse-branch-commits) and what it looks like in the Git Log swimlanes.

These swimlanes are great!
They tell us that those commits are in main.
We kinda want them in our feature branch.

One more thing though: what changes are included in those commits?

## The Solution

We saw going to the Git Log, choosing a commit, and getting to a diff.
This is against your local _branch_, not the uncommitted changes in your _working directory_.
But that’s not the branch.
That’s a commit on the branch.
If the branch had multiple commits, you could select all them.
The IDE will figure out all the changes, vs. your local branch.

That’s a lot of work.
Let’s just compare with the branch.
In the branches popup, select a branch, and choose “Compare With your-branch-name”.
The top shows commits in “main”, since your branch last updated with it.
The bottom has your commits, in your branch, not yet a part of main.

That’s for _commits_ on your branch.
“Show Diff with Working Tree”, though, compares against the changes in your _working directory_.
Use “Show Diff”, then navigate through the changes.
