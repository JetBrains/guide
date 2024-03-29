---
date: 2019-04-15
title: Conditional Breakpoints
topics:
  - debugging
author: pwe
subtitle: Speed up your debugging by stopping execution only when you want to.
seealso:
  - title: Breakpoint properties
    href: >-
      https://www.jetbrains.com/help/pycharm/using-breakpoints.html#breakpoint-properties
thumbnail: ./thumbnail.png
video: "https://youtu.be/aIlXb2QpxXc"
---

Debugging? Super-useful. Visual debugging? Super-super-useful. Stepping through a loop until the end, when your problem surfaces? Not so much.

Take a step forward on your debugging zen with _conditional_ breakpoints.

Let's say you have a problem on a line in your code and you want to stop there and see what's happening. But the problem doesn't occur the first time that line is executed. Maybe the line is in a loop, and the problem doesn't occur until the end. Or maybe the line is in a function which gets called 100 times before the function argument value under suspicion is passed in.

Set a breakpoint on the line, then right-click on the breakpoint. You get a dialog to edit the properties of a breakpoint. Meaning, PyCharm breakpoints are richer than just a red circle.

In the **Condition** box, type in an expression, such as `age > 90`, that must be true for the breakpoint to be triggered. You can use any variable in scope at that line, and PyCharm autocomplete works in that box.

When you then debug your code, that line will be passed over _until_ the condition is met. When true, the debugger stops on that line, just like normal.

During difficult (read: insane) investigations, you wind up trying the same thing over-and-over. The field has a drop-down with a history of expressions you've used.

There are other ways to edit a breakpoint's properties, such as the `View Breakpoints` action <kbd>⌘⇧F8</kbd> (macOS) / <kbd>Ctrl+Shift+F8 (Windows/Linux)</kbd> which is also a button in the debug tool window. This option shows all the defined breakpoints.
