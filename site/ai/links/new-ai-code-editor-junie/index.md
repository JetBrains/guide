---
date: 2025-21-05
title: "New AI Editor by JetBrains: Junie (Cursor killer??)"
topics:
  - ai
  - ai-community
  - junie
author: hs
subtitle: Watch as Nuno Maduro explores Junie.
thumbnail: ./thumbnail.png
video: "https://youtu.be/tfBS85Ksfag"
linkURL: "https://youtu.be/tfBS85Ksfag"
---

## Overview

I cannot start this overview without saying a couple of points. Firstly - I'm not a PHP expert, but I am a developer so I can identify with many of his statements! Second, the enthusiasm that the author [Nuno Maduro](https://nunomaduro.com/socials) demonstrates throughout the video is off the scale! I really wish I had his level of energy—it's a super engaging video so let's dig in!

Nuno starts off by asking Junie in PhpStorm to "create a very simple, minimal UI for a to-do application without any "fillables" that obeys the rules file." By rules, Nuno is referring to his Junie `guidelines.md` file that he set up previously.

And we're off!

I love how Nuno talked through everything in realtime, noting that he really likes the fact that Junie details the plan. He also took the time to explain Junie's Brave mode (allows you to execute terminal commands without requiring user-confirmation). It's not long before Junie starts creating the content and Nuno is delighted with what he sees, stating it as "promising" several times!

One helpful tip I picked up that's hiding in plain sight is that you can do a `git status` command (of course providing you're using Git to track your project) to see immediately which files Junie has created / changed. Which brings me to another good point, when using an agent such as Junie it's helpful to check in your human-made changes before you ask the AI Agent to get started!

Nuno goes into a great detail of the implementation that Junie has proposed, and as a spoiler, no rating is lower than 8 out of 10! In fact some aspects of the implementation were a solid 10/10 and "awesome"! For all you PHP developers out there, this is the meat of the review where Nuno talks about the model generation, coding conventions, to-do controller, form requests and validation, the front-end/UI and more!

At the end of the review, Nuno shows us that Junie has created a basic front-end using Blade templates and Tailwind CSS. It’s very minimal but well-organized. He then went on to ask Junie to make the design more appealing, like Revolut and Junie engaged with the requirements and refined the layout while running linting and tests to ensure compliance with the Junie `guidelines.md` file. I love how Junie does these extra steps without needing to explicitly specify them.

I would say that Nuno really enjoyed his experience with Junie, calling it a "10 out of 10 vibe coding experience"! Nuno wraps up his video by stating that "Starting today, I’m going to use Junie for the rest of my life!" which is great to hear because I agree!
