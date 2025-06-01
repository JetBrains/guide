---
date: 2025-06-02
title: "My experience using Junie for the past few months"
topics:
  - junie
author: hs
subtitle: Julien takes us through his experience of using Junie for the first time.
thumbnail: ./thumbnail.png
linkURL: "https://lengrand.fr/my-experience-using-junie-for-the-past-few-months/"
---

Since this blog post was first published, there have been a few changes to the information Julien had at the time. To start with, as of the date of writing, Junie supports most of the JetBrains IDEs; however, support for Rider is not yet available. That said, it is coming soon, so watch this space!

Next, we need to discuss licensing. If you have the All Products Pack or Dot Ultimate, you will also have AI Pro included. AI Pro is the middle tier of our AI offering. In our IDEs, you get AI free at a minimum, which provides a limited number of tokens to try out Junie. At the other end of the scale is AI Ultimate, which is an AI-token buffet. One additional note: Junie is not currently available for IntelliJ IDEA or PyCharm Community Editions.

If you're new to Junie, the difference between [Code](https://www.jetbrains.com/help/junie/code-mode.html) and [Ask](https://www.jetbrains.com/help/junie/ask-mode.html) mode is very useful to know, as well as [Brave mode](https://www.jetbrains.com/help/junie/code-mode.html#brave-mode) - Julien does a great job of explaining what these all mean. Before we move on, Julien also suggests checking out the main [JetBrains AI page](https://www.jetbrains.com/ai/) to understand the offerings fully.

Julien openly admits that he struggles to understand the difference between Junie, AI Assistant, and Mellum, so perhaps this is a good time for me to step in and try to provide some clarity. Firstly, Junie is our agentic AI solution. You can fully delegate a task to it and give it autonomy to complete it, and it will examine your project, create a step-by-step plan, execute the plan, and test the implementation of your request before you review it. AI Assistant is designed to support you in your day-to-day coding, enabling you to iterate faster. Which one you use is determined by which task you want to perform, as they complement your workflow in different ways. Finally, [Mellum](https://huggingface.co/JetBrains/Mellum-4b-base) is the name we gave to the LLM that we built and trained specifically for code completion, and we have since open-sourced it on Hugging Face for you all to check out.

So, what does Julie think of Junie?

- First up, Junie is very eager to solve his problems. Here we see Julian iterate on the prompts provided to Junie, including specifying what he didn't want in the implementation, which improved the result.
- Junie can get some basics wrong. I think this might be a good use of the [Junie Guidelines](https://www.jetbrains.com/help/junie/customize-guidelines.html) for the readers here. If you always want Junie to do, or not do, certain things, then the `guidelines.md` file is for you.
- Trust but verify. I think this one speaks for itself; You should always take time to verify and understand any code written by any AI agent!
- Junie can be opinionated. Yes, it absolutely can be and can move your files around. My suggestion here is that if you're going to delegate a task to any AI Agent, including Junie, you do a git check-in first so you can see and review the changes.
- He misses the option to refuse part of the solution. This one is helpful feedback for us here at JetBrains. Thank you, Julien!
- Julian thinks the Ask mode responses were great. I agree!
  -Julien found Junie to be extremely slow by comparison. I know this is something we're actively working on, so again, thank you for bringing it to our attention, Julien! We are on it! Watch this space ;-)
- Julien did experience some bugs, I suppose we all do, but it's good to know that, like all software, it has glitches.
- Julian pondered the need for structured Junie guidelines. This is good timing because we've just released a [public repo](https://github.com/JetBrains/junie-guidelines) with some structured Junie guidelines in it. Let us know what you think! More are coming soon, so star the repo!

Julien finishes with some helpful tips for all your Junie users out there, but ends on a note of caution regarding speed, which, again, you can expect to improve as we're actively working on it. Go ahead and give Junie a go!
