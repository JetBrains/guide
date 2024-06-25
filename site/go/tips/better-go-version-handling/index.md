---
date: 2021-07-06
title: Declare a Targeted Go Version in go.mod
topics:
  - editing
  - go
author: dlsniper
subtitle: The IDE is aware of targeted Go versions so you can make the most of them
thumbnail: ./thumbnail.png
video: "https://youtu.be/vUt-WAYY4cw"
---

The IDE reads the _go_ directive in the _go.mod_ file when it analyzes files.

You don't need to do anything to use this feature. However, the IDE might suggest new operations based on the difference between the project SDK and the targeted Go version via _go.mod_.
