---
hasBody: true
date: 2023-05-10
title: Rebase Feature Branch
technologies: []
topics: [vcs]
author: pwe
subtitle: Get your feature branch caught up with changes on the main branch.
seealso:
  - title: Apply changes from one Git branch to another
    href: https://www.jetbrains.com/help/webstorm/apply-changes-from-one-branch-to-another.html
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
shortVideo:
  url: https://www.youtube.com/watch?v=wiU3TL3jM8I
leadin: |
    You're working on a feature branch and it's been a while. The 
    main branch has changes and you don't want to risk a merge conflict.

    Let the IDE help you *rebase* your feature branch onto the latest commit.
---

## The Problem

You make a feature branch, "BASED" on a starting commit on main.
You do some work and commit: your VCS swimlane than tells you where you are in the history.

While you were working, you noticed your colleague committed to main.
You don’t want to get out-of-date, so you do a fetch.
The swimlane now shows that main has a commit *after* the one your branch is based on.

We’ll compare it with our working tree. 
Yes, you want that work in your branch. 
Start by getting those changes applied to your local main.

You could merge it into your branch. 
But then, when you finish and merge back to main, that commit will be in two places.

## The Solution

Let’s see the solution visually, then perform the IDE action.
Our feature branch was based off a starting commit.
We want to "re-do: the basing. 
Meaning, re-base. 

We want to act as if this branch started from a new commit, instead of the starting commit.
We’re going to move the connection point. 
Go to that branch, and choose “Rebase `[your branch name]` onto main…”.

We select rebase and our VCS swimlane line now goes to the newer commit.

We just showed “look before you leap”: you fetch first, then rebase. 
Want to do both at once?
This time, go to the remote branch and choose “Pull into …”. 
This does a fetch and rebase in one step.

Which way is better?
Well, it depends. 
If you have a lot of trust, skip the step.  
