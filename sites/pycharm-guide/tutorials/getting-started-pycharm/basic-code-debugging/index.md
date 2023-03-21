---
type: TutorialStep
date: 2023-03-30
title: Basic Code Debugging
technologies: []
topics: []
author: hs
subtitle: How to use PyCharm's debugger effectively.
thumbnail: thumbnail.png
videoBottom: true
longVideo:
  poster: poster_long.png
  url: https://youtu.be/j0Wz_uBaDmo
---

In the previous step, we saw how PyCharm refactoring can save you time by doing work for you.

In this step, we’ll look at PyCharm’s debugger, specifically how to use it to walk through your running code and to help you find and fix bugs.

## Breakpoints and Debug Session
Everything starts with a breakpoint. Breakpoints are markers that tell the debugger to suspend the execution of a program. To add and remove breakpoints click the gutter in the line where you want to add them. You can also add a breakpoint from the keyboard by leaving the caret at the end of the line and pressing (**⌘F8**| **Ctrl+F8**).

In this example we are adding a breakpoint to this `if` statement inside our loop, so the program will suspend the execution on each iteration. We can run the program with the debugger by clicking the little *bug* button at the top of PyCharm. This runs the currently-selected configuration, but under the debugger.

<img src="debug_icon.png" alt="Debug Icon" width="400"/>

This project was made from the Flask project template, so it had a Flask Run Configuration made from the start. Another way to run the program with the debugger is to right-click inside the editor and select **Debug name** and PyCharm will create a temporary Run Configuration and run it for you.

When you run a project in PyCharm using the debugger, it will open the Debug tool window. When you click the URL in the Debug tool window, the execution is suspended, as the breakpoint was hit. You can now examine the program in its current state, control its execution, and test several scenarios at runtime.

## Debug Tool Window
The Debug Tool Window has a few sections that are worth mentioning.

On the left side we have a few buttons. This is where you can:
- Re-run your application
- Resume your program to move forward with its execution
- Stop your program button when you are done with debugging and want the program to terminate

<img src="debug-left-menu.png" alt="Debug left-menu" width="200"/>

On the top there are two main areas:
- Debugger & Console tabs
- The buttons to help us control the execution

<img src="control-execution.png" alt="Control Execution" width="300"/>

## Debugger and Console Tab
The debugger has a lot of power available to you. On the **Debugger** tab you can see the stack frames that represent the current state of the program on the left side, and the variables panel with local values at that execution point on the right.

<img src="debugger-frame.png" alt="Debugger Frame" width="400"/>

The stack frame on the left acts like a history of your program’s current state. New frames are added to the top of the stack each time a method is called, and removed when its execution is complete.

By examining it you can go back in time and understand when and why specific parameters were passed to a method, as well as the current state of the caller at the time of the call.

Stack frames from code outside your project like libraries, for instance, are in gray.

Let’s select the most recent frame. We can use the variable panel to see the current value assigned to any variables in our program. In this case, we can see that the value 65 is assigned to our ‘R’ variable.

<img src="r-variable.png" alt="R Variable" width="400"/>

If you don't want the distraction of looking away from your code, you can also see the values in the editor, as code comments.

While in the current context, you can also play around with your variables to obtain additional details about the program state or test different scenarios at runtime. For example, you can see the value of ‘R+30’.

<img src="r-plus-30.png" alt="R plus 30" width="400"/>

Finally, we can click the Console tab to get the full Python console in the context of this point of the execution. Here you can start using the interactive prompt in the context of the current breakpoint and line. For example, let’s see R+30 again.

<img src="r-plus-30-console.png" alt="R Plus 30 console" width="400"/>

## Step Through
Sometimes, you need to walk through the execution of your code. This time, instead of having our breakpoint in the `if` statement, we will move it to the outer function, where we call `highest_random`. Once the breakpoint is hit and the execution stops, we can walk into the inner function by using **Step Into**.

<img src="step-into.png" alt="Step Into" width="500"/>

If  we click **Step Over**, we are going to walk through the execution line by line.

If you then say **Step Into**, PyCharm will take you into Python’s Random `randint` function. In some cases this can be useful, but most of the time you are trying to solve problems in your own code. Let's stop and restart the debug session, and instead of **Step Into**, let's use PyCharm’s **Step Into My Code**.

<img src="step-into-my-code.png" alt="Step Into My Code" width="500"/>

Now, even if we keep clicking, PyCharm won’t head into any library code, only code in my own project.

## Conclusion
In this step, we saw PyCharm’s star attraction, the debugger. We covered what you need to be productive: breakpoints, the tool window layout, evaluating variables and expressions, and stepping through code. Check the [documentation](https://www.jetbrains.com/help/pycharm/debugging-python-code.html) for an in-depth understanding of debugging capabilities in PyCharm.

That's it, the end of the tutorial! We hope you found this useful and, that you enjoy using PyCharm!

## Video
You can also check out the video for this step from our Getting Started series on YouTube: