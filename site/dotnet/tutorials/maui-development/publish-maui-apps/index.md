---
type: TutorialStep
date: 2025-07-23
title: Publish .NET MAUI Apps
topics:
  - .net
  - asp.net
  - data
  - editing
  - resharper
  - rider
author: khalidabuhakmeh
subtitle: Get your app deployed to an app store.
thumbnail: ./thumbnail.png
---

JetBrains Rider can also help deploy your applications. If you plan on publishing to the Apple App Store, you’ll need to provision a profile. Right-clicking the solution and select **Open in Xcode**.

<img alt="publish1.png" src="publish1.png" width="600"/>

JetBrains Rider will create a new Xcode project, launch the development tool, watch the Xcode project for changes, and sync changes back to JetBrains Rider.

<img alt="publish2.png" src="publish2.png" width="700"/>

I’ve added new Signing & Capabilities settings and a new target here. Saving these changes alerts Rider to sync the changes back into our MAUI application.

<img alt="publish3.png" src="publish3.png" width="700"/>

Once you’ve prepared your solution to share with others, right-click the MAUI project and select **Publish**. Then choose the **Local Folder...** option.

<img alt="publish4.png" src="publish4.png" width="400"/>

You’ll be presented with a run configuration window that allows you to perform essential publishing tasks, such as signing the application using your Apple developer certificate, picking the target platform, the publish location of the final artifact, and the build configuration.

<img alt="publish5.png" src="publish5.png" width="800"/>

Once you’ve executed the run configuration, you can upload artifacts to the target platform's application store.
