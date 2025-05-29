---
date: 2025-05-29
title: Run Target support via Docker
topics:
  - debugging
  - go
  - running
author: mm
subtitle: Run your application or tests in Docker Container with ease.
thumbnail: ./thumbnail.jpg
video: "./go_docker.webm"
---

For specific run/debug configurations, you can execute your code in different environments, such as the cloud or a Docker container, directly from GoLand.

This feature lets you quickly test your changes in the actual environment the app is designed for.

If a target already exists, select it from the _Run on_ field in a _Run Configuration_, then run that configuration.

If no targets exist, then click on **Manage Targets**, next to the _Run on_ field.

Then, click <kbd>+</kbd> (macOS) / <kbd>Plus</kbd> (Windows/Linux) and select in which environment you want to run the application or test.

After the IDE introspects that environment, click on **Next**, confirm the environment settings, and click **OK**.

Then select the newly created target in the _Run on_ field.

Configure any additional options, and, finally, run the configuration as with any other.

If you want to compile your sources in a remote environment, then select the **Build on remote environment** option from the _Run Configuration_ settings.

If you choose to compile on the local machine instead, you don't need to worry about ensuring the dependencies are available in the remote environment.
