---
date: 2023-07-19
title: Find Actions in Any JetBrains IDE
topics:
  - ide
  - platform
author: hs
subtitle: "If you want to do something, but don't remember the shortcut or menu option, use Find Action. Press ⇧⌘A (on Mac) or Control+Shift+A (on Windows/Linux)"
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/eZUe_44B3nk"
obsoletes:
  - /goland/tips/find-action/
  - /idea/tips/find-actions/
  - /pycharm/tips/find-action/
  - /webstorm/toggle-options-in-find/
---

## The Problem

You want to move a line up. You could use the mouse to select the line, cut it, go to the next line up, and paste it. You know the IDE has an action that can do it, but…what is it?

Let’s use the mouse and look in the Edit menu. Hmm, not there. How about Code? Ahh, yes, it’s there, with the keyboard shortcut. Maybe you speed that up by learning the shortcuts. There’s the Keyboard Shortcuts PDF. You could try memorizing all of that... possibly but nor probable.

The IDE has a lot of power, which means a lot of actions, with new ones coming in each release, not to mention plugins. You’re not going to memorize all of them. Does the IDE have a better way?

## The Solution

What you need is Find Action, a single keyboard shortcut to memorize. The one ring to rule them all. Shift-Cmd-A on macOS, Shift-Ctrl-A on Windows and Linux:

Type “move line up” and you’ll see the Move Line Up Action. Bonus: the keyboard shortcut is shown when an action has one.

That’s a lot to type. Instead, use speed typing to type just fragments such as "m | u". Maybe you don’t know the full action name. Just type one word to get in the ballpark such as "type".

One last point: Find Action also matches preferences, and some are inline toggleable. Want to disable tabs without opening settings/preferences? Start Find Action and type ta pl no for the Window | Editor Tabs | Tabs Placement: None preference. Press Enter to toggle it.

Remember…you don’t have to remember! Keyboard shortcuts, that is. Let Find Action be your one-stop-shopping for actions.
