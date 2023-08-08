---
date: 2023-08-08
title: Rename refactoring
technologies: [.net,csharp]
products: [rider,resharper]
topics: [editing,refactoring]
author: rachelappel
subtitle: Would a variable by any other name read as clearly?
seealso:
  - title: Rename Refactoring
    href: https://www.jetbrains.com/help/rider/Refactorings__Rename.html
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
animatedGif:
  file: ./tip.gif
  width: 1584
  height: 1080
leadin: |
  Just when you think you've selected the perfect name for a variable, a class, or some other block of code...
  You haven't. Because naming is hard.
  The _rename_ refactoring makes changing names easy.
---

## Rename refactoring

Naming doesn't really have to be that hard. Especially when there's rename refactoring!

As you write code and add more conditional statements, expressions, and other constructs you'll have some clashes with names or naming styles that you want to change. Alternatively, you may need to align the terminology in software to match business jargon, so business rules are expressed in a more straightforward way in code.
Once we rename something, we are reminded that variables, expressions, and functions are called from many place in the codebase. If a name is changed, it needs to also be changed everywhere it is called. This could mean thousands of named references to update in large projects. Not fun! 
Fortunately, Rider doesn't just rename something, but properly updates all references to it, so we don't have to. 

To refactor names in Rider, choose the entity you want to change, such as a variable, class, or method and change it. Rider recognizes the change and displays a light bulb indicating there's an action you can take. To continue, press `Alt + Enter` or `Ctrl + Shift + R` to invoke the refactoring dialog. Select **Apply Rename Refactoring**, and you're done!
Rider updated all the required references.