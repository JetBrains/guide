---
date: 2021-05-24
title: Extract Type Refactoring
topics:
  - go
  - refactoring
author: dlsniper
subtitle: >-
  Extract a type into its own definition and improve the  reusability in your
  code
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: >-
  https://www.youtube.com/watch?v=fFJi3OSSWns&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=44
---

If you have an anonymous type defined, you can extract it into a
standalone type and reuse it across your code.

**How to use:**
Invoke the _Refactor this_ feature, _Ctrl + Alt + Shift + T on
Windows/Linux_, and _^ + T on macOS_, on the anonymous type, then
select the _Extract type_ from the list of available
refactorings.

Give it a name and start reusing the newly created type in your
code.

<span class="tag is-rounded">New in 2021.1</span>
