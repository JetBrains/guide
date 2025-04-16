---
date: 2018-12-02
title: Optimize Imports
topics:
  - editing
  - python
author: pwe
subtitle: >-
  Automate the organizing and cleaning up of your Python imports with optimize imports.
seealso:
  - title: Optimizing Imports
    href: "https://www.jetbrains.com/help/pycharm-edu/optimizing-imports.html"
  - title: Creating and Optimizing Imports
    href: >-
      https://www.jetbrains.com/help/pycharm/creating-and-optimizing-imports.html
thumbnail: ./thumbnail.png
video: "https://youtu.be/lNm5ISUZqCE"
---

PyCharm automates many "gardening" tasks when writing Python code. Managing your imports is one of them: with the Optimize Imports action, PyCharm cleans
up your imports, using your import style preferences.

For example, Python's [PEP 8 section on import style](https://www.python.org/dev/peps/pep-0008/#imports) might complain that you have an unused imports, your imports aren't sorted within a group, and you have two top-level imports on the same line. Also, you might set in a project that you'd like to always split imports from the same source.

PyCharm can clean all of that up using Optimize Imports, which cleans up your imports based on settings you can save. This action can be run on a single file or across _all files in a project_. Also, the _Commit_ dialog box has a checkbox to run it in the _Before Commit_ section.

Finally, PyCharm with Pro subscription applies all of this to imports in other languages such as JavaScript and TypeScript.
