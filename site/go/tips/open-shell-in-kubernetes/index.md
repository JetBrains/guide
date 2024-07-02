---
date: 2020-12-03
title: Open Shell in Kubernetes
topics:
  - kubernetes
author: dlsniper
subtitle: Run an interactive shell for the container in the selected pod.
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=0XjeqTLwPXo&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=75
---

Select the pod you want from the _Kubernetes_ view in the _Services_ tool window, then click on the _Run Shell_ button. A new tab will open and a terminal will be attached to the running pod.

By default, the IDE runs _/bin/bash_ as a shell. To run a different one, click **Show Settings** or open **Settings/Preferences | Build, Execution, Deployment | Kubernetes** and specify the shell that your pods use.

**Note:** You must have the [Kubernetes plugin](https://plugins.jetbrains.com/plugin/10485-kubernetes) provided by JetBrains installed for this action to work.
