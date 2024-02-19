---
date: 2021-05-24
title: Run Target support via WSL
topics:
  - debugging
  - debugging
  - go
  - running
author: dlsniper
subtitle: Run your application or tests in Windows Subsystem for Linux (WSL) with ease
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=bjukeT3p0Mc&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=108
---

Run Targets are a new IDE feature that allows you to run code in environments where GoLand is not installed.

**How to use:**
If a target already exists, select it from the _Run on_ field in a _Run Configuration_, then run that configuration.

If not targets exist, then click on **Manage Targets**, next to the _Run on_ field.

Then, click <kbd>+</kbd> (macOS) / <kbd>Plus</kbd> (Windows/Linux) and select in which environment you want to run the application or test.

After the IDE introspects that environment, click on **Next**, confirm the environment settings, and click **OK**.

Then select the newly created target in the _Run on_ field.

Configure any additional options, and, finally, run the configuration as with any other.

**Pro tip:** If you want to compile your sources in a remote environment, then select the **Build on remote environment** option from the _Run Configuration_ settings.

**Pro tip:** You choose to compile on the local machine. This means you don't have to worry about the dependencies being available in that environment.
