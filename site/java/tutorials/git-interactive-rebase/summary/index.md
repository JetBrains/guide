---
type: TutorialStep
date: 2021-11-09
title: Summary and Shortcuts
topics: []
author: md
subtitle: Git interactive rebase Summary
thumbnail: ./thumbnail.png
---

## Summary

Now we know how to use git interactive rebase either from the UI or from the command line. Give them a try and use whichever way you prefer.

### IntelliJ IDEA Shortcuts Used

Here are the IntelliJ IDEA shortcuts that we used.

| Name                                                                                             | macOS Shortcut  | Windows / Linux Shortcut |
| ------------------------------------------------------------------------------------------------ | --------------- | ------------------------ |
| [Open the Git Tool Window](https://www.jetbrains.com/help/idea/version-control-tool-window.html) | <kbd>⌘9</kbd>   | <kbd>Alt+9</kbd>         |
| Open the Commit Window                                                                           | <kbd>⌘0</kbd>   | <kbd>Alt+0</kbd>         |
| [Open the Terminal](https://www.jetbrains.com/help/idea/terminal-emulator.html)                  | <kbd>⌥F12</kbd> | <kbd>Alt+F12</kbd>       |
| Select Fixup (in the "Rebasing Commits" popup)                                                   | <kbd>⌥F12</kbd> | <kbd>Alt+F</kbd>         |
| Edit commit message (in the Git Log)                                                             | <kbd>F2</kbd>   | <kbd>F2</kbd>            |

### Git commands Used

Here are the Git commands that we used.

| Name                                                                                   | terminal command           |
| -------------------------------------------------------------------------------------- | -------------------------- |
| Git interactively rebase from a specific commit with commit hash, for example 11aa23bc | **git rebase -i 11aa23bc** |
| Use this commit                                                                        | **pick**                   |
| Fixup this commit (add changes to previous commit under the same commit message)       | **fixup**                  |
| Squash this commit (add changes to previous commit and combine commit messages)        | **squash**                 |

### vi Shortcuts Used

Here are the shortcuts that we used.

| Name                                       | Shortcut |
| ------------------------------------------ | -------- |
| Open interactive (edit) mode               | **I**    |
| Exit interactive (edit) mode               | **esc**  |
| Remove line (**note**: not in edit mode)   | **dd**   |
| Reinsert line (**note**: not in edit mode) | **p**    |
| Write and quit                             | **:wq**  |
| Force quit                                 | **:q!**  |

### Related Links

- [(video) JetBrains Using Git Interactive Rebase](https://www.youtube.com/watch?v=bPX9VHjviEM)
- [(docs) JetBrains - Edit project history by performing interactive rebase](https://www.jetbrains.com/help/idea/edit-project-history.html#interactive-rebase)
- [(code) gitdemo project on GitHub](https://github.com/mlvandijk/gitdemo)
- [(docs) Git SCM rebase](https://git-scm.com/docs/git-rebase)
- [(docs) Oracle Basic vi Commands](https://docs.oracle.com/cd/E19253-01/806-7612/editorvi-43/index.html)
