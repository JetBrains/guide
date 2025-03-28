---
date: 2024-07-01
title: Refactor Code with AI Assistant
subtitle: How AI Assistant can help you refactor code.
seealso:
  - title: (documentation) IntelliJ IDEA Help - Explain Code
    href: >-
      https://www.jetbrains.com/help/idea/use-prompts-to-explain-and-refactor-your-code.html#ai-explain-code
topics:
  - ai
  - aia
author: hs
thumbnail: ./thumbnail.png
video: "https://youtu.be/tKGsRGaM8IY"
---

## The Problem

Did you know that [JetBrains AI Assistant](https://www.jetbrains.com/ai/) can refactor code for you? You know, just in case you want to change the semantics?

## The Solution

You can invoke Context Actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and then select **AI Actions > Suggest Refactoring**. JetBrains AI Assistant will then offer some suggestions, and code snippets, on how you could refactor your code.

![refactor-menu.png](refactor-menu.png)

And if you don’t like the suggestion. You can keep or discard aspects of it and iterate until you get something you’re happy with. Perhaps we don’t want to use Java Streams. JetBrains AI Assistant will iterate on the previous suggestion, and give you some new ideas for refactoring your code!

![without-streams.png](without-streams.png)

If you like the suggestion, you can press **See Diff and Apply** and then **Accept All**.

![see-diff-apply.png](see-diff-apply.png)

It works with any code, like this code. Once again, invoke Context Actions <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and then select **AI Actions > Refactoring**:

![c-sharp-code.png](c-sharp-code.png)

You can also just ask JetBrains AI Assistant to help you with some refactoring:

![ask-ai-assistant.png](ask-ai-assistant.png)

JetBrains AI Assistant refactoring, because sometimes we want to change things!
