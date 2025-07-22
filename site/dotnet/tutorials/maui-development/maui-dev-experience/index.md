---
type: TutorialStep
date: 2025-07-23
title: The MAUI Developer Experience
topics:
  - .net
  - asp.net
  - data
  - editing
  - resharper
  - rider
author: khalidabuhakmeh
subtitle: Write and edit XAML code to build MAUI apps.
thumbnail: ./thumbnail.png
---

## Explore your code

This section will give you a high-level overview of JetBrains Rider, helpful for folks new to MAUI or the JetBrains IDE. Look at your first MAUI project from the top left and around the IDE. Note that icon positions can change depending on your configuration; some may even be hidden.

The first thing folks should look at is the **Solution Explorer**. This is where all the code files exist, including the platform-specific folders for each target platform.

![devexp1.png](devexp1.png)

## Run configurations & devices

You'll notice the run toolbar at the top of the IDE workspace. You can select the target platform emulator, simulator, or physical device here.

<img alt="devexp2.png" src="devexp2.png" width="700"/>

Next to the device selector, you’ll find your solution's **Run Configuration** selections. Here, you can run and debug any options typically found in an MAUI solution.

<img alt="devexp3.png" src="devexp3.png" width="300"/>

You’ll notice Android tool windows for **Device Manager** and **Device Explorer** on the right-hand side. Respectively, the first allows you to create and manage virtual Android devices.

<img alt="devexp4.png" src="devexp4.png" width="400"/>

The second allows you to navigate the folders found on the virtual device when the device is running and see running processes.

<img alt="devexp5.png" src="devexp5.png" width="400"/>

## Editing code

Most importantly, the code editor window in the middle of the screen will provide you with a world-class XAML editing experience with code completion, syntax highlighting, error and warning analysis, and more.

![devexp6.png](devexp6.png)

For more advanced functionality, check out the code generation of event handlers on UI elements.

![devexp7.png](devexp7.png)

In larger applications, the **Find Usages** functionality can also help identify when, where, and how MAUI controls and properties are used throughout the codebase.

<img alt="devexp8.png" src="devexp8.png" width="600"/>

There is no such thing as a bug-free app. Therefore, you'll need to debug your apps.
