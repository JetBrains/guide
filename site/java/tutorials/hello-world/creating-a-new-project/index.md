---
type: TutorialStep
date: 2024-10-23
title: Creating a new project
topics: []
author: hs
subtitle: Using the New Project Wizard to create a new project.
thumbnail: ./thumbnail.png
---

In this walk-through, you will create, run and package a simple Java application that prints "Hello World" to the system output. You will also see some IntelliJ IDEA features that can boost your productivity, for example, coding assistance and supplementary tools. All the features in this tutorial are available in both IntelliJ IDEA Community edition and IntelliJ IDEA Ultimate.

**The link to the relevant portion of the video is available in each tutorial step at the bottom.**

1. You can use the [New Project Wizard](https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html) to create a new Project inside IntelliJ IDEA. From the Welcome screen you can click **New Project**, or, if you're already inside a project, you can go to **File | New | Project**.

If you have previously opened a project, the **New Project** button will be on the top bar.

![Welcome Screen - Existing projects](welcome-screen-existing-projects.png)

If you haven't opened a project before, the **New Project** option is in the Welcome screen:

![Welcome Screen - New Project Highlighted](welcome-screen.png)

2. Give your project a name such as "HelloWorld", leave the default location as it is and then select **IntelliJ** as the build system. You also need to select a JDK for compiling this project from the Project SDK drop-down:

![Java Project and JDK selection](java-select-jdk.png)

IntelliJ IDEA will show you a list of configured JDKs at the top of the list as well as a list of JDKs it's detected on your machine at the bottom of the list. You can select any of these, or you can click **Download JDK**.

Java is packaged and provided by a number of different vendors. This list shows some of the most common ones. OpenJDK is Oracle's free, open JDK build, which will always be the latest version. If you pick another vendor, you will see all the available versions for that vendor.

This tutorial doesn't need the latest version of Java, so feel free to select the one you're most comfortable with. Finally, if you want to use a JDK that's on your machine, but hasn't been detected by IntelliJ IDEA, you can press **Add JDK** to browse to it.

The IDE will spend a bit of time downloading and installing the Java Development Kit if you opted to download a JDK. You don't need to do any additional configuration once it's downloaded, IntelliJ IDEA handles that for you.

3. We are going to create our own _Hello World_ tutorial so clear the **Add sample code** checkbox as we will be doing everything from scratch.

![Hello World Project Options](name-hello-world.png)

4. You don't need any additional libraries or frameworks for this tutorial so click **Create**
