---
type: TutorialStep
date: 2023-03-30
title: Basic Code Assistance
topics: []
author: hs
subtitle: Learn about syntax highlighting and how to get code assistance.
thumbnail: thumbnail.png
videoBottom: true
video: "https://youtu.be/MCsDfAsxG-Q"
---

In the previous step, we saw how PyCharm makes it easy to work with your project’s Python packages. In this step, we are going to talk about one of the most important reasons to use PyCharm - code assistance.

## Code Completion

First off, let’s talk about context-aware code completion, where the IDE uses all kinds of smarts to help you finish your typing. Live Templates are one such example. The keyboard shortcut is <kbd>⌘J</kbd> (macOS) / <kbd>Ctrl+J</kbd> (Windows/Linux) but PyCharm will invoke them by default when you start typing some code that matches a Live Template. You can find a list of Live Templates in your Preferences/Settings <kbd>⌘,</kbd> (macOS) / <kbd>Ctrl+Alt+S</kbd> (Windows/Linux) and you can also [add your own](https://www.jetbrains.com/help/pycharm/creating-and-editing-live-templates.html).

<img src="live_templates.png" alt="Live Templates" width="700"/>

PyCharm also offers you basic and type-based smart completion. For example, if we start typing something, PyCharm prompts with options to complete your code, so you won’t need to type the full line. For example, if you have this code in the above class and type in `C`, PyCharm will offer you `Car`.

<img src="basic-completion.png" alt="Basic Code Completion" width="700"/>

If it’s the correct completion, as it is in this case, we can press _Enter_, and PyCharm will complete the line for you. If the correct completion is in the list, but not selected, you can use the arrows in your keyboard to go up and down to select it and then press **Enter**. And finally, if the correct completion is not in the list yes, you can keep typing until PyCharm figures it out for you.

Code completion is not only available for classes, but also for methods. We created a variable called `bmw` that instantiates from the `Car` class. If we want to use one of its methods, we can write `bmw` plus `dot` and PyCharm will offer [basic completion](https://www.jetbrains.com/help/pycharm/auto-completing-code.html#basic_completion) for the available methods.

Here's a cool tip - while <kbd>⏎</kbd> (macOS) / <kbd>Enter</kbd> (Windows/Linux) adds the suggested completion, you can also press **tab** to switch an existing one for the new one, saving you time.

Code completion is also available for keywords. Let’s say you want to import a package. If you start typing `i` at the top of your file, PyCharm will immediately offer `import` as a possible completion.

<img src="import-basic-completion.png" alt="Import Basic Code Completion" width="700"/>

The cool thing about code completion is that you can also use it in many other places, including method parameters, Dictionaries, Django templates, inside f-strings, and much more. Check out [the PyCharm documentation](https://www.jetbrains.com/help/pycharm/auto-completing-code.html) for more details.

That’s cool, but how does PyCharm do it? We just saw a simplified example, but sometimes you will be working within much more complex projects with multiple inter-dependencies. How can PyCharm understand what class you are about to instantiate, what method you are about to call, and so on?

PyCharm examines the code of your entire project and creates a virtual map. This makes PyCharm fully aware of your code and allows actions like code completion to be performed immediately. The process of reading your entire project is called ‘indexing’ and it happens when you open your project, switch between branches, load or unload plugins, or after large external file updates.

So next time you hear your laptop fans right after you open a new project, have in mind that this process will end soon and will give you access to powerful features that will make your life easier in a few moments.

## Syntax Highlighting

Another productivity booster that you might take for granted is syntax highlighting. In this scre=ipt, PyCharm automatically detects keywords such as `def`, `for`, `while`, as well as class names, parameters, etc., and renders them in different colors.

<img src="editor-colours.png" alt="Colours in the editor" width="700"/>

This makes it easier for you to scan your code, quickly recognize errors, and have a better overview of your code structure. You can update the color scheme if you prefer. To see how, [check out the PyCharm documentation](https://www.jetbrains.com/help/pycharm/configuring-colors-and-fonts.html).

## Code Intentions

One of the most important features for improving your code quality is what we call intention actions. As you work in the editor, PyCharm continually analyzes your code to find ways to optimize it and detect errors. Whenever the IDE finds possible improvements it shows a yellow bulb icon next to the current line.

Here, for instance, we added `if sudden == True`. Although it's valid syntax, it can be optimized, so PyCharm shows you the yellow bulb right away. To access the intention action available for this line of code, you can click the light bulb or use the (_Alt+Enter_ | _⌥⏎_) keyboard shortcut.

PyCharm will offer to **Replace boolean expression with sudden**. Intention actions cover a wide range of situations from warnings, to optimizations, to automation.

Let’s say you want to invert this `if` condition. If you position my caret here (show) PyCharm offers to handle it for you.

<img src="invert-if-condition.png" alt="Invert if condition" width="700"/>

I can also undo this to go back to the way the code was if I want to.

We've looked at warnings, but sometimes there are errors and PyCharm can also find any problems within your code. In this case, whenever it happens, the light bulb color will be red. This is a signal that a quick-fix is available and to check possible solutions you can use the same commands as before.

We can see one example of a quick fix if we try to use a package without installing it first. Let’s change our car from `bmw` to `tesla` and add `web_page` as a property of the class `Car`. Now, let’s create a quick method to fetch the Tesla website, assuming that the car needs this information to work.

We’ve written the method mentioning the package `requests` but haven’t installed it yet. Let’s see what PyCharm offers us, using (**⌥⏎** | **Alt+Enter**) this time.

<img src="error-intentions.png" alt="Error intentions" width="700"/>

`Install and import package requests` sounds like what we need, so this is what we'll select it. As you see, PyCharm not only installed the package inside my virtual environment, but it also auto-imported it to my script! The red squiggly and the light bulb are gone, and the code should run smoothly now.

In this example, we imported an external package, but we could have also imported something from within the project. PyCharm makes it easy to fix problems, such as imports, without interrupting your flow.

## Viewing Problems

No one likes problems, right? Neither does PyCharm or the PyCharm team. That’s why we work hard to make it easier for you to write better code and stay away from errors.
But they happen. Let's take a look at two quick ways to spot them in a file.

When PyCharm finds warnings or errors, besides light bulbs and squiggly lines, it also displays your errors in the scrollbar. Let’s see how it looks. Here is a file with a number of problems. As you can see, the stripes indicate where the problem was found. To see more information about the problem you can hover the stripe, or click it to navigate to the proper line.

If you don't want to scroll down your entire file searching for problems, though, the second quick way to spot problems is by checking the Problems widget.

<img src="problems-widget.png" alt="Problems Widget" width="700"/>

It summarizes errors and warnings and lets you quickly navigate to the Problems Tool window <kbd>⌘6</kbd> (macOS) / <kbd>Alt+6</kbd> (Windows/Linux) to have a better description of what is going on. Here we can see the error and quickly navigate to the line where it happens. We can also look across our entire project.

<img src="problems-tool-window.png" alt="Problems Tool Window" width="700"/>

Let’s fix this error and use the [code reformat action](https://www.jetbrains.com/help/pycharm/reformat-and-rearrange-code.html#reformat_file) <kbd>⌘⌥L</kbd> (macOS) / <kbd>Ctrl+Alt+L</kbd> (Windows/Linux) to put everything in the right place. Now the errors and warnings are gone, and the file is formatted following PEP-8 conventions.

## Conclusion

Congratulations! You just saw how to use PyCharm to help you write better code with fewer errors, but this is just the tip of the iceberg.

In the next step, we’ll see how to use [Run Configurations](https://www.jetbrains.com/help/pycharm/run-debug-configuration.html) to run your Python scripts.

## Video

You can also check out the video for this step from our Getting Started series on YouTube:
