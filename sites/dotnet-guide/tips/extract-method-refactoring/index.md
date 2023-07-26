---
hasBody: true
date: 2023-07-01
title: Extract method refactoring
technologies: [.net,csharp]
products: [rider,resharper]
topics: [editing,refactoring]
author: rachelappel
subtitle: Split and Organize code into DRY, discrete units.
seealso:
  - title: Extract Method
    href: https://www.jetbrains.com/help/rider/Refactorings__Extract_Method.html
  - title: Local Functions
    href: https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/local-functions
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
animatedGif:
  file: ./tip.gif
  width: 1584
  height: 1080
leadin: |  
  Knowing when to break code into smaller units (methods or functions) is a key skill in software development.
  One way to accomplish this is by using your IDE to extract methods.  
---

Code must be refactored for readability and maintenance.
Of the many refactorings a developer might use, the Extract Method refactoring enables us to write and organize code better.

## When to extract a method

When functions become too large, they become harder to read and maintain.
So we need to split them out into smaller functions, and organize the code to call those smaller functions when needed.

Sometimes, we see code that's been copied and pasted that can be consolidated into a single function.
Or perhaps the code wasn't copied and pasted, but it's still not DRY ([Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)), because two or more blocks of code produce the same output or behavior.
That kind of code should also be refactored into a single function.

Lastly, some programmers use a "stream of consciousness" workflow in which they get code working first, then to return and immediately refactor it into something more efficient and maintainable.

These are some scenarios where the *Extract Method* refactoring can make development more smooth.

## How to use Extract Method refactoring 

In Rider, highlight the code you want to extract and press `Ctrl + Shift + R`. 
Choose the type of method you want: method or local function. 
Supply the name, return type, parameters, visibility, and location and other information requested in the refactoring dialog.
This information is used to create a new method or local function for the selected code to live in, as well as calls to it.