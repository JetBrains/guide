---
date: 2021-05-24
title: Rename Go Module Refactoring
topics:
  - go
  - refactoring
author: dlsniper
subtitle: Upgrade Go modules to newer versions with ease
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=fnVaPcMHSWs&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=117
---

If you need to change your Go module's name or upgrade it to a new major, then the _Rename refactoring_ has you covered.

Place the cursor under the module name in the _go.mod_ file, then invoke the _Refactor this_ feature, <kbd>^T</kbd> (macOS) / <kbd>Ctrl+Alt+Shift+T</kbd> (Windows/Linux).

Select _Rename_ from the list and change the module according to your needs.

You can preview the changes by clicking on the _Preview_ button in the dialog or undo them with _Undo_ operation. You can also undo the change later using the _Local history_ feature.

If you upgrade your module's import path to a new major version, don't forget to tag the release too.
