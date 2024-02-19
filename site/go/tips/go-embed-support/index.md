---
date: 2021-05-24
title: "Support for go:embed directive"
topics:
  - editing
  - go
author: dlsniper
subtitle: Embed files and folders into your binaries with no external tool
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=Dv28uFbn7I0&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=145
---

Go 1.16 introduced a new feature called _go:embed_.

This works using a compiler directive, _//go:embed_, and a variable, or more, of type _string_, _[]byte_, or _embed.FS_.

If you want to embed a directory, then you must use the _embed.FS_ type for the variable in which you need to embed the content.

**How to use:**
You don't need to do anything special to get the IDE to support this feature.

Open any Go 1.16, or newer, based project, and embed what you need.
