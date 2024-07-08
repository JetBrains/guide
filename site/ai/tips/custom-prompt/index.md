---
date: 2024-07-08
title: "Custom prompts"
subtitle: Use a custom prompt to let AI Assistant help you.
seealso:
  - title: (documentation) IntelliJ IDEA Help - Add your own prompts to prompts library
    href: https://www.jetbrains.com/help/idea/use-prompts-to-explain-and-refactor-your-code.html#ai_add_custom_prompts
topics:
  - ai
  - java
author: md
thumbnail: ./thumbnail.png
video: "https://youtu.be/V9F9z1F1Bqo"
---

Create your own custom prompts for AI Assistant. For example, to add logging to your code.

Open **Settings** and go to **Tools | AI Assistant | Prompt Library** and click + to create a new prompt.
Write your new prompt in the text field. If needed, click the `$SELECTION` variable to add a Markdown-formatted code block with current code selection and language name to the new prompt. Edit the **Prompt name**.

Select the first checkbox if you want AI Assistant to wait for you to make additional input in the chat after invoking the prompt.

Keep the second checkbox if you want your new prompt to be listed in the **AI Actions** menu. If you don't select this checkbox, the custom prompt will only be available from the chat window.

Click **Apply** to save your prompt.
