---
date: 2025-05-28
title: Stop a Remote Process After Debugging It
topics:
  - debugging
  - go
author: dlsniper
subtitle: Clean-up processes after interacting with them in remote debugging scenarios.
thumbnail: ./thumbnail.png
video: "./stop_remote_process.webm"
---

Create a new **Go Remote** run configuration type via **\_Run | Edit Configurations... | + Go Remote**. In the run configuration settings, in the _On disconnect_ section, choose either **Stop remote Delve process**, **Leave it running**, or **Ask** to determine how the configuration behaves when you stop the debugger.
