---
date: 2021-05-24
title: Create getters and setters for struct fields
topics:
  - editing
  - go
author: dlsniper
subtitle: "Generate the support code to access fields indirectly, via getters and setters"
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=epLp9e8zC-A&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=40
---

Do you need to access your struct fields via getters and setters? Add all the boilerplate code you need using the dedicated _Generate getter and setter_ action.

**How to use:**
Select a struct type, then press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and choose _Generate getter and setter_ from the list of available actions.

Choose which fields should have these methods generated, then press _OK_ to generate them.

Choose the receiver name and receiver type then continue working on your code as usual.

**Pro tip:** You can choose either all fields, or select the individual fields that need to have these methods generated.
