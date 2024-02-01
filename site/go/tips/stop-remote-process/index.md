---
date: 2020-12-03
title: Stop a Remote process after debugging it
topics:
  - debugging
  - go
author: dlsniper
subtitle: Clean-up processes after interacting with them in remote debugging scenarios
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: >-
  https://www.youtube.com/watch?v=RoLYWoDJDIU&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=147
---

**How to use:**

Create a new **Go Remote** run configuration type via **\_Run | Edit Configurations... | + Go Remote**. In the run configuration settings, in the _On disconnect_ section, choose either **Stop remote Delve process**, **Leave it running**, or **Ask** to determine how the configuration behaves when you stop the debugger.
