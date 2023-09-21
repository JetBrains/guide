---
hasBody: true
date: 2023-09-21
title: Use collection initializers
technologies: [.net,csharp]
products: [rider,resharper]
topics: [editing,refactoring]
author: rachelappel
subtitle: Update and initialize items in old collection declarations 
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
animatedGif:
  file: ./tip.gif
  width: 1584
  height: 1080
leadin: |  
  Update older code that works with collections so that data is initialized immediately rather than using more code than is necessary.
---

## Initializing members of a collection or list

For many years the de facto way to create `List` objects and other collection types was by first declaring a variable, and then populating it with several calls to an `Add` (or similarly named) method.
While this works perfectly fine, the syntax is a bit outdated. So you may want to update it. The more modern way to declare and initialize a collection is to both declare the list or collection while instantiating several individual member objects.  

To make this change manually requires both changing the syntax of the items added to the collection, then moving those items into a constructor. This is a lot of small changes, specifically deleting parenthesis, curly brackets and other tokens. What seems like a small update can result in a lot of syntax errors.
Fortunately, Rider reduces this work to two keystrokes and zero syntax errors. When Rider sees the original declaration style, it displays a green indicator on the `new` keyword where the list or collection is instantiated.
Place the caret on the green indicator under the `new` keyword, and press <kbd>Alt+Enter</kbd> to see what options are available. In this case, Rider suggests changing to a collection initializer.
Choosing it changes the code so that it uses property initializers for each object in the `List` using a modern syntax.

Under the hood, C# still makes calls to `Add` (or similar), but your code becomes much more readable!