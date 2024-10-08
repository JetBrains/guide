---
type: TutorialStep
date: 2023-03-30
title: Basic Code Refactoring
topics: []
author: hs
subtitle: Get more productive and less error-prone with refactorings.
thumbnail: thumbnail.png
videoBottom: true
video: "https://youtu.be/4kzEbqaT2DY"
---

In the previous step, we saw how PyCharm can run your Python code.

In this step, we are going to talk about refactoring. Ever wish your IDE could do your work for you?

## Change Signature

How many times does your work involve changing the signature of a given method? As easy as it sounds, changing a method signature can have a deep impact in your code and break your program in multiple places. The _change signature_ refactoring helps you safely change a method signature, including changing its name; adding, removing, and reordering parameters; and assigning default values to the parameters.

Let’s start by changing its signature of a method name. We will add a new parameter here. The easiest approach is to do it inline. When you do this, PyCharm already gives you a yellow light bulb and a refactoring indication in the gutter. To access it use <kbd>⌥⇧⏎</kbd> (macOS) / <kbd>Shift+Alt+Enter</kbd> (Windows/Linux).

<img src="update-usages.png" alt="Update Usages" />

The first option is **Update usages to reflect signature change...**. When you click it, PyCharm will show you the previous and current method signature, and require a default value so it won’t break our program. At this point PyCharm is using its knowledge of your project acquired during indexing to add the default value to all your current method calls.

PyCharm will update all the usages in your project, so you don't have to go hunting for other places to update. Thankfully, your code will still compile.

## Rename

Renaming is another common type of refactoring. You first write your code, get everything working, and then start making names more meaningful. This is when the rename refactoring comes in handy. As with signature changes, _rename_ can also be done in place.

Let’s just go ahead and change this method name from `say_state` to `print_state`. We can also use <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) to invoke the context menu and choose to update usages.

<img src="rename.png" alt="Rename" />

The change is reflected in the code that calls this function. PyCharm will also find usages in other code in your project. For example, we have another file that imports this function and calls it.

## Extract Method

Inplace refactorings are great, but PyCharm can also help you with much more robust refactoring techniques such as ‘Extract Method’. The Extract Method refactoring lets you take a code fragment, group it into a method, and replace the old code with a method call.

To extract a method you can either use <kbd>⌥⌘M</kbd> (macOS) / <kbd>Ctrl+Alt+M</kbd> (Windows/Linux), or the **Refactor This** menu which is <kbd>^T</kbd> (macOS) / <kbd>Ctrl+Alt+Shift+T</kbd> (Windows/Linux). Let’s take this code fragment as an example. Let's select it, and invoke the ‘Refactor this’ men and choose **Extract Method**.

<img src="refactor-this.png" alt="Refactor This" />

We can now give the new method a name and click **OK**. PyCharm will now create a function in the class with the name we gave and called it from the previous place.

<img src="refactored.png" alt="refactored" />

Of course, your code will still run exactly as it did before and we expect your examples to be somewhat more complicated!

## Conclusion

These are three common refactoring techniques that will automate your workflow and minimize your chances of bugs. PyCharm has many more robust refactoring capabilities, so, after experimenting with these basic ones make sure to [try the others](https://www.jetbrains.com/help/pycharm/refactoring-source-code.html).

In the next step we will see how to perform basic testing in PyCharm.

## Video

You can also check out the video for this step from our Getting Started series on YouTube:
