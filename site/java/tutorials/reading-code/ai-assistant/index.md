---
type: TutorialStep
date: 2024-03-01
title: JetBrains AI Assistant
topics:
  - ai
  - aia
  - tricks
author: md
subtitle: Using AI Assistant to understand code.
thumbnail: ./thumbnail.png
video:
  url: "https://www.youtube.com/watch?v=hjGVJHOLSjA"
  start: 326
  end: 415
---

If you are using JetBrains AI Assistant, you can ask AI Assistant to explain the commit to you. Right-click the commit in the **Git** tool window, and select **Explain commit with AI Assistant** from the context menu. JetBrains AI Assistant is an additional service available in IntelliJ IDEA from version 2023.3. It has several features that can help us understand our code. For example, we can ask AI Assistant to explain code, write documentation, or generate unit tests.

To use AI Assistant to explain code, right-click in the editor and select **AI Actions** | **Explain code** from the context menu. If we use the action **Explain code** without selecting any code, we see the entire file is selected and AI Assistant opens a chat where it will explain the code in this file. Alternatively, we can select a specific piece of code, like a method, and perform the same action to get an explanation of that section of code. We can write documentation for a class or method, **AI Actions** | **Write Documentation**. Note that our cursor needs to be on the class or method for this to work. We can’t write documentation for a blank line!

And of course, we can ask AI Assistant questions in the chat. Open the chat on the right by clicking the AI Assistant icon, and ask your question. For example, to explain the project.
Keep in mind that even if you use AI Assistant to write code for you, you’ll still need to be able to read code! You’ll need to evaluate the code provided, and understand whether that is the code you want.
