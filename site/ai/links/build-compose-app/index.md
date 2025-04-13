---
date: 2025-03-10
title: 'Review: "The New AI Coding Agent from JetBrains - Can it build a Compose Desktop app"'
topics:
  - ai
  - junie
  - learn-junie
author: pwe
subtitle: A professional developer gets Junie to help on two frontend projects.
thumbnail: ./thumbnail.png
linkURL: "https://bazlur.ca/2025/03/03/jetbrains-junie-my-firsthand-experience/"
---

Can Junie write a Compose Desktop application -- just with prompts, without coding from the
developer? [Dave Leeds](https://www.youtube.com/@typealias) has one of the first Junie walkthrough videos, with useful
tips along the way.

I found the concept quite interesting: "If Junie makes an error, Junie will have to be the one to fix it." At multiple
times, I would have just broken out of vibe mode and gone to fix something. Dave wanted to see how far Junie could go in
control. Turns out: farther than I expected. It also made the session more like a regular flow, problems and all. Plus,
with Dave coming back on screen periodically, with a smile, it really felt like I was sitting beside him, getting a
demo.

The session started at the very beginning, with a Junie window and a vanilla Kotlin "hello world" project. The sample
app was moderately-complex in the first prompt: a Compose app that reads a list of videos from YouTube and shows the
selected video on the right. But his prompt _also_ pinned the version of the Compose Gradle plugin. "What's that about?"
He showed why in the following segment.

As the Junie plan executed, Dave clicked the "chips" on each plan step to see the diff, in the IDE diff viewer. I'm
right at home in our IDEs' diff viewer, so this is a productive way for me to work.

Dave took time to look at the plan steps to show how Junie is problem-solving:

- Versions of packages to be compatible
- Async
- Properties file for configuration
- Finishing with a look at a nice README

One neat trick -- if you hit a build error, just copy and paste it into the prompt. This told Junie to remove the
build-issue dependency and write its own implementation, which fixed the problem.

In one of the prompts, a Junie plan step had a button to run the tests. As Dave points out, these run in the IDE's test
UI. This pleased my heart, as I'm madly in love with how our IDE UI for testing.

Dave wanted Junie to handle commits, with a commit for each task. He showed creating Junie guidelines in
`.junie/guidelines.md` to tell Junie to do so. As it turns out, with the version of Junie he was using, he had to tell
Junie to reload the guidelines.

He wanted the app to have a different color scheme, so he downloaded a Compose them to a directory and told Junie to
apply it. Pointing Junie at a folder on disk to apply a theme is something I wouldn't have thought of. It's a good
reminder that we'll all be growing into how to use these tools.

Dave wrapped up with some suggested improvements:

- It's slow, and needs to show more info about what it is up to during slow steps
- State LLM info for example version numbers of libraries
- For example, augment this with a check against Maven etc. for latest versions

He mentioned that the finished code is in a repo. Is the quality any good? He said pretty good, but check it out for
yourself and see what you think.
