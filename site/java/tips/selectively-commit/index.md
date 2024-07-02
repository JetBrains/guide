---
date: 2023-12-11
title: Selectively Commit Changes
topics:
  - git
  - vcs
author: md
subtitle: Selectively commit a subset of changes in a file to VCS.
thumbnail: ./thumbnail.png
seealso:
  - title: >-
      (documentation) IntelliJ IDEA Help - Select chunks and specific lines you
      want to commit
    href: >-
      https://www.jetbrains.com/help/idea/2023.3/commit-and-push-changes.html#select_chunks_in_commit_changes_dialog
video: "https://www.youtube.com/watch?v=AW5Xv8n3iEo"
---

Sometimes you're making multiple changes to a file that you don't want to commit together. For example, if you're working on a new feature, but notice some other small things you want to fix. If these changes are in separate files, we can commit each file separately. But what if they’re in the same file?

We can select which chunks and specific lines we want to add to our commit.

We can see which files were changed by opening the _Commit_ tool window <kbd>⌘0</kbd> (macOS) / <kbd>Alt+0</kbd> (Windows/Linux). Here we can open the diff for a particular file to see which changes were made to that file, using <kbd>⌘D</kbd> (macOS) / <kbd>Ctrl+D</kbd> (Windows/Linux). In the diff, we have the option to include specific changes to our commit, by selecting **Include into commit** in the gutter next to each chunk of modified, deleted or newly added code.

We can even select specific lines from a change to include in a commit. To commit only a specific line from a chunk, right-click the line you want to include and select **Split Chunk and Include Current Line into Commit**.
Alternatively, hover over the gutter and select the checkbox next to the line you want to include in the commit. Or, if we change our mind, we can also hover over the gutter and clear the checkbox next to the line we want to exclude.

Once we have selected all the changes we want to commit, we write a meaningful commit message, and select **Commit**. Any unselected changes will stay in the current change list, so that you can commit them separately later.

What if we don’t want to add these changes to the same pull request, not even in a separate commit? Maybe you want to do some more cleaning up in your code base, and create a separate pull request for those changes later.
We can undo this commit and move these changes to a different change list. To do so, select **Move to Another Changelist** from the context menu of a modified chunk.
