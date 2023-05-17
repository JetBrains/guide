---
hasBody: true
date: 2023-05-13
title: Resolve Conflicts
technologies: []
topics: [vcs]
author: pwe
subtitle: Let the IDE help in the tricky business of resolving merge conflicts.
seealso:
  - title: Resolve conflicts
    href: https://www.jetbrains.com/help/idea/resolve-conflicts.html
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
shortVideo:
  url: https://www.youtube.com/watch?v=mSfq1SoMocg
leadin: |

  Collaborative development is great! 
  Until it isn't, and you have a merge conflict.
  Let the IDE help you sort through the overlaps and resolve them.

---

## The Problem

You finish your work on a branch, do your last commit, time to merge your feature branch to main.
You update main, then do the merge, and -- the dreaded -- merge conflict.

In the actual file on disk, the conflict information is encoded in a -- let's just say, in a *certain* way.
You could resolve things manually. 
Can the IDE help?

## The Solution

You could discard their changes by clicking “Accept Yours”. 
Or throw out your changes with “Accept Theirs”. 
The on-screen table helps explain which is which. 
But probably isn't what you want.

To start resolving, click the `Merge` button and the IDE guides you through each change in each file.
In the left column you see a file as it is in the branch you are merging into. 
In this case, `main`. 
All kinds of changes: additions in green, removals in gray, changes and blue, with conflicting changes in red.

On the right, you see that same file, as it is on your branch, the feature branch you’re merging.
In the middle, you see the in-progress merged result for this file.

Now, process each change – ignore it by clicking the X, or keep it by clicking the arrows. 
As you do, the middle pain updates, and you have one less “change” to process.
If you clicked the wrong button, use Undo to put resolution back in its previous state.

The middle pane is a fully-featured IDE editor, including autocomplete. 
If you need to correct something, or just start typing.

Some of these changes aren’t conflicts. 
Save time by accepting non-conflicting changes: in both directions, or just one. 
We’ll use this in a second.

You can move between changes sequentially. 
If there is a second file with unresolved changes, the tool will shift to that. 
Or, move between files manually.

Let’s click “All” to process non-conflicting changes in both files.

Once you have processed all the conflicts, the IDE will detect all changes have been processed. 
Click `Save changes` and finish merging. 
