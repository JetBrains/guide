---
date: 2023-08-08
title: Rename refactoring
topics:
  - .net
  - csharp
  - editing
  - refactoring
  - resharper
  - rider
author: rachelappel
subtitle: Would a variable by any other name read as clearly?
seealso:
  - title: Rename Refactoring
    href: "https://www.jetbrains.com/help/rider/Refactorings__Rename.html"
thumbnail: ./thumbnail.png
animatedGif:
  file: ./tip.webm
  width: 1584
  height: 1080
---

## Rename refactoring

Naming doesn't really have to be that hard. Especially when there's rename refactoring!

As you write code and add more conditional statements, expressions, and other constructs you'll have some clashes with names or naming styles that you want to change. Alternatively, you may need to align the terminology in software to match business jargon, so business rules are expressed in a more straightforward way in code.
Once we rename something, we are reminded that variables, expressions, and functions are called from many place in the codebase. If a name is changed, it needs to also be changed everywhere it is called. This could mean thousands of named references to update in large projects. Not fun!
Fortunately, both Rider and ReSharper properly update all references to the new name, so we don't have to.

To refactor names in Rider or ReSharper, choose the entity you want to change, such as a variable, class, or method and change it. The IDE recognizes the change and displays a light bulb indicating there's an action you can take. To continue, press <kbd>⌘⇧R</kbd> (macOS) / <kbd>Ctrl+Shift+R</kbd> (VS Windows/Linux) to invoke the refactoring dialog. Select **Apply Rename Refactoring**, and you're done!
Rider updated all the required references.
