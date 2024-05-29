---
date: 2024-02-12
title: Explain Code with AI Assistant
subtitle: How AI Assistant can help you understand code
seealso:
  - title: (documentation) IntelliJ IDEA Help - Explain Code
    href: >-
      https://www.jetbrains.com/help/idea/use-prompts-to-explain-and-refactor-your-code.html#ai-explain-code
topics:
  - ai
author: hs
thumbnail: ./thumbnail.png
animatedGif:
  file: ./tip.webm
---

Use <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) on the code you want to use in your question to AI Assistant and select **AI Actions**. You will be presented with a list of prompts, such as:

- Explain Code
- Suggest Refactoring
- Find Problems
- New Chat Using Selection
- Write Documentation
- Generate Unit Tests
- Generate Code
- Convert File to Another Language

These prompts are context aware so may differ depending on your type of project. You can also click on the final link **Add Your Prompts** to add your own custom prompts with the $SELECTION variable, for example:

- Code at your caret
- Project structure
- Code language
- VCS history
- Local changes
- & More

In addition, AI Assistant is context-aware so when you use one of these prompts, AI Assistant uses information from your project such as:
`How can I improve the readability of $SELECTION`

In this example, we select **Explain Code** and AI Assistant generates text to help you to understand the code you enquired about.
