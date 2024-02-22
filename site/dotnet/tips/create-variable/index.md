---
date: 2020-02-27
title: Introducing Variables
topics:
  - .net
  - editing
  - inspections
  - resharper
  - rider
author: matkoch
subtitle: Introduce variables the way you like!
thumbnail: ./thumbnail.png
animatedGif:
  file: ./02-create-variable.webm
  width: 643
  height: 375
---

**Struggling with long lines of code?** 🙇‍♀️

Existing expressions can easily be assigned to a new variable using the _Introduce Variable_ refactoring. We can either select the expression and invoke **Refactor | Introduce Variable** or type `.var` at the end of the expression to invoke the related _postfix template_. The refactoring also takes repeated occurrences of our expression into account to _reduce code duplication_.

Of course, inlining a variable is equally easy using the **Refactor | Inline Variable** refactoring.

Remember to always use meaningful names! 🏷

### See Also

- [Introducing variables with deconstruction](https://blog.jetbrains.com/dotnet/2018/04/26/introduce-variable-iterate-merge-back-deconstruction/)
- [Introduce Variable refactoring](https://www.jetbrains.com/help/rider/Refactorings__Introduce_Variable.html)
- [Introduce Variable for Substring refactoring](https://www.jetbrains.com/help/rider/Refactorings__Introduce_Variable_for_Substring.html)
