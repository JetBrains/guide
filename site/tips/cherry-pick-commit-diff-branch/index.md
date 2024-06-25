---
date: 2023-03-23
title: Cherry Pick a Commit to a Different Branch
topics:
  - git
author: hs
subtitle: >-
  Apply a commit from one branch to another with Git cherry pick.
thumbnail: ./thumbnail.png
seealso:
  - title: Cherry-pick separate commits
    href: >-
      https://www.jetbrains.com/help/idea/apply-changes-from-one-branch-to-another.html#cherry-pick
video: "https://youtu.be/SkcvWURJkWQ"
---

## The Problem

You're working on a new feature but an urgent bug came in. You fixed the bug and committed the fix, but oops... you forgot to create a new branch for the bugfix. Now this commit is on the wrong branch.

## The Solution

We only want to move this one commit from the feature branch to a separate bugfix branch. We can do this using Git's "cherry pick" option from the IDE. Let's go back to main and create the bugfix branch that we should have created in the first place.

On the newly created branch, we can select the bugfix commit from the other branch and select "cherry pick" to apply that commit to our current branch. As we can see, the bugfix commit is now on the bugfix branch.

Cherry picking can be useful in other situations too. For example, to backport a fix to a previous release branch. Let's look for the last release. We can search for a specific commit hash, branch or tag name in the Git log (⌘ F on Mac or Ctrl+F on Windows/Linux). We can also filter commits in the commit log by branch, user, date or path.

To see which commits have not yet been applied to this branch, we can click **View Options** and select **Highlight** | **Not Cherry-Picked Commits**. We'll compare with the new-feature branch. Commits that have already been applied to the current branch are greyed out.

When we select a commit, we can look at the information in the Commit Details area to make sure these are the changes we want to transfer to this branch, and cherry-pick them to the previous release branch.

What if we want to cherry pick only part of a commit? In the Commit details pane on the right, select the files containing the changes you want to apply to the target branch, and select Cherry-Pick Selected Changes from the context menu.

The cherry picked changes are transferred to the change list and we can commit them from there. So far, cherry picking went smoothly because there are no conflicting changes.

When we cherry-pick a commit that has conflicts with our current branch, the Merge Conflicts dialog opens. We can resolve the merge conflicts here. We want to keep some changes, and reject others. If you're not able to resolve the merge conflicts, you can also abort the cherry pick.

Once we're done cherry picking, we can go back to the "feature" branch. Since we haven't pushed these changes yet, we can remove the commit from the feature branch by selecting **Drop commit**.

What if you have pushed the changes already? Then you might want to revert it on this branch instead. Now we can continue working on the new feature!
