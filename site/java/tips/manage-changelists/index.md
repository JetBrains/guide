---
date: 2021-12-03
title: Manage VCS Changelists in IntelliJ IDEA
topics:
  - git
  - interface
  - refactoring
  - vcs
author: vb
subtitle: Group and commit changes related to certain tasks so you have a cleaner commit history.
thumbnail: ./thumbnail.png
seealso:
  - title: (video) Version Control with IntelliJ IDEA
    href: "https://www.youtube.com/watch?v=-S3Q_-b52rA"
  - title: (documentation) IntelliJ IDEA Help - Manage Changelists
    href: "https://www.jetbrains.com/help/idea/managing-changelists.html"
video: "https://youtu.be/gg3yi-yc2ys"
---

Select the files or changed lines in a file which you want to group together for certain tasks and use <kbd>⌘⇧M</kbd> (macOS) / <kbd>Alt+Shift+M</kbd> (Windows/Linux) to bring up the _Move Files to Another Changelist_ dialog.

You can give it a name to create a new changelist or choose from an existing changelist. IntelliJ IDEA will restore the selected changes in the corresponding changelist.

## Default Active Changelist

Use <kbd>⌘0</kbd> (macOS) / <kbd>Alt+0</kbd> (Windows/Linux), to show the _Commit_ tool window.

_Changes_ in the _Commit_ tool window\*\* are in the default active changelist. The active changelist is highlighted in bold.

![Default Active Changelist](default-active-changelist.png)

### Set Active Changelist

You can set a changelist to Active if you want to commit your changes to VCS. Select the changelist and use <kbd>⌃␣</kbd> (macOS) / <kbd>Ctrl+Space</kbd> (Windows/Linux) to set it to the active changelist.

![Set Active Changelist](set-active-changelist-ctrl-space.png)

## Creating Changelist

### Using Search Everywhere

Use <kbd>⇧⇧</kbd> (macOS) / <kbd>Shift+Shift</kbd> (Windows/Linux), to bring up the Search Everywhere dialog. You can now search for _Changelist_ and select **New changelist...** to bring up **New changelist** dialog.

![New Changelist using Search Everywhere](create-change-list-using-search-everywhere.png)

### Using Commit Window

You can also right-click or secondary click on the Commit Window to show the options and click **New changelist...** to bring up the _New changelist_ dialog.

![New Changelist using Commit Window](new-changelist-using-commit-window.png)

### New changelist dialog

[New Changelist dialog Reference](https://www.jetbrains.com/help/idea/2021.2/new-changelist-dialog.html)

![New Changelist dialog](new-changelist.png)

## Deleting Changelist

You can use the Commit Window to **Delete Changelist**

![Delete Changelist using Commit Window](delete-changelist-using-commit-window.png)

Alternatively, you can use <kbd>⌘⇧A</kbd> (macOS) / <kbd>Ctrl+Shift+A</kbd>, to bring up the Find Actions dialog which will filter the Search Everywhere dialog to just Actions.

# Scenarios to use different changelists

- Suppose you are working on your code which requires only selected changes to be committed in VCS and you want to continue developing your code. In that case, you can move your changes to a different changelist and group together.
- If you want to run your application with a unique configuration without impacting your existing code, you can maintain the changed files in different changelists.
