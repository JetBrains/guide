---
date: 2020-12-03
title: Run a Single Test
topics:
  - go
  - testing
author: dlsniper
subtitle: Focus your testing on new test cases or tests that fail.
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=VshkrFowxjQ&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=113
---

When you have a testing table of more than a handful of cases, it can be hard to focus on a specific test case.

If the IDE can determine the name of the test, then you can use either the green arrow next to the test name or using _Run context configuration_ via <kbd>⌃⇧R</kbd> (macOS) / <kbd>Ctrl+Shift+F10 (Windows/Linux)</kbd>.

**Note:** This feature relies on the IDE to interpret the test name. This means that there are some restrictions on how to name your tests for the IDE to correctly determine them and provide this functionality:

- The test data variable must be a slice, an array, or a map. It must be defined in the same function as the call and must not be touched after initialization (except for range clauses in a for loop).
- The individual test data entry must be a struct literal. Loop variables used in a subtest name expression must not be touched before the call.
- A subtest name expression can be a string field in the test data, a concatenation of test data string fields, and an fmt.Sprintf() call with %s and %d verbs.
