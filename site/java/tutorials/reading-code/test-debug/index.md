---
type: TutorialStep
date: 2024-03-01
title: Testing and debugging
topics:
  - tricks
  - testing
  - debugging
author: md
subtitle: Testing and debugging in IntelliJ IDEA.
thumbnail: ./thumbnail.png
video:
  url: "https://www.youtube.com/watch?v=hjGVJHOLSjA"
  start: 180
  end: 251
---

To understand intended behavior, we can look at the tests. Use <kbd>⌘⇧T</kbd> (macOS) / <kbd>Ctrl+Shift+T</kbd> (Windows/Linux) to **Navigate to Tests**. To look at the code and its tests side by side, right-click the tab for the test file and select **Split and Move Right** from the context menu.

We can run a test through the debugger to actually see how the code is executed. First, we need to place a breakpoint at the location in the code we’re interested in. Use <kbd>⌘F8</kbd> (macOS) / <kbd>Ctrl+F8</kbd> (Windows/Linux) to toggle the breakpoint.

Next, we run our test using the debug option. We can do so by clicking the green run button in the gutter next to our test.

Execution will stop at the breakpoint, so we can investigate the state of our application. We can see current values of variables and objects. We can evaluate an expression, using the shortcut <kbd>⌥F8</kbd> (macOS) / <kbd>Alt+F8</kbd> (Windows/Linux), to see its current value and look at more details. In the **Evaluate** popup, we can even change the expressions to evaluate different results.

We can continue execution by either stepping into a method, using <kbd>F7</kbd> (macOS) / <kbd>F7</kbd> (Windows/Linux), to see what happens inside a called method or stepping over a line, using <kbd>F8</kbd> (macOS) / <kbd>F8</kbd> (Windows/Linux), to go to the next line even if a method is called, depending on what we’re interested in. Finally, we can resume the program, using <kbd>⌥⌘R</kbd> (macOS) / <kbd>F9</kbd> (Windows/Linux), to finish the execution of the test.

If there is no test that exercises the piece of code you are interested in, you might want to add one. This can also help you verify any assumptions you might have about the code.
