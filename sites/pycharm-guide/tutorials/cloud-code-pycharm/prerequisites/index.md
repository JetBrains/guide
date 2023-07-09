---
type: TutorialStep
date: 2023-07-10
title: Installing the Google Cloud Code plugin and the Google Cloud SDK
technologies: [kubernetes,django]
topics: [python]
author: mm
subtitle: Lorem Ipsum
thumbnail: thumbnail.png
longVideo:
  poster: poster_long.png
  url: https://www.youtube.com/watch?v=cqIz9aR8bMk
---

# Prerequisites 

## Installation

In this tutorial, we are going to install the Google Cloud SDK and the Google Cloud Code plugin.

I recommend following the official documentation [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)


![screen1](./images/screen1.png)

Install the SDK for your particular operating system. 


There is a wide variety of OS options to choose from: 
- Linux, Debian, or Ubuntu
- RedHat, Fedora, or CentOS
- macOS
- Windows

Once you’ve installed the gcloud CLI, you can confirm it by typing the following command in the terminal: `gcloud version`.

You’ll need to install the `gke-gcloud-auth-plugin` binary. Run the following command to install the dependency:

```
gcloud components install gke-gcloud-auth-plugin
```
![screen2](./images/screen2.png)


The image below shows what this looks like on a machine where the plugin is already installed.


![screen3](./images/screen3.png)


To learn more about `gke-gcloud-auth-plugin`, click the link below: 

[https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke)


For this tutorial, we will be using [Docker Desktop](https://www.docker.com/products/docker-desktop/).

![docker_desktop1](./images/docker_desktop1.png)


Make sure to **Enable Kubernetes**. The Kubernetes server runs locally within your Docker instance, and is a single-node cluster.

![docker_desktop2](./images/docker_desktop2.png)

## Configuring the Google Cloud SDK with Google Project

Now that we have the Google Cloud SDK installed, we need to configure it to talk to a specific project.

For this, we’ll use the SDK’s `gcloud` utility for CLI-based Google Cloud access.

Follow the steps below to configure `gcloud` with a specific Google project.

- Step 1: Initialize the project configuration using the following command:
```
gcloud init
```  
- Step 2: You’ll then see the following prompt. As I have one project already configured in my CLI, I’ll go
  ahead and create a new configuration by choosing the second option **(Create a new configuration)**.


![screen4](./images/screen4.png)

- Step 3: I’ll enter the configuration name as “jetbrains”.



![screen5](./images/screen5.png)

- Step 4: Next, I’ll choose my Gmail account, which is the first option. Make sure you are already logged in to your Gmail account before selecting this option.

![screen6](./images/screen6.png)


- Step 5: I’ll then select the cloud project **jetbrains-387607**, having already created such a project in the Google Cloud console.


![screen7](./images/screen7.png)


Great! The SDK has now been successfully configured.

![screen8](./images/screen8.png)

If you are not aware of how to create a new project in Google Cloud, then it’s quite simple.

Goto - [https://cloud.google.com/console](https://cloud.google.com/console)

![gcp_new_project1](./images/gcp_new_project1.png)

Click on the hamburger icon and hover over to Dashboard

![gcp_new_project2](./images/gcp_new_project_2.png)

Click on **Create Project**

Provide the **Project Name**.

**Note**: For our use case I have already created the project “**jetbrains-387607**”

![gcp_new_project3](./images/gcp_new_project_3.png)
![gcp_new_project4](./images/gcp_new_project_4.png)

It will take few second to initialize and finally your new project will up and running.

![gcp_new_project5](./images/gcp_new_project_5.png)



Now, let’s move to PyCharm and install the Google Cloud Code plugin.

Make sure you’ve installed the latest version of PyCharm on your machine. Give a try and 
[download PyCharm](https://www.jetbrains.com/pycharm/download/) right now. For this tutorial, we’re using PyCharm 2023.1.2.

## The Google Cloud Code plugin

Once you open PyCharm, click on the **Plugins** section. 
Search for “Google Cloud Code” and click **Install**.

![screen9](./images/screen9.png)

Once installation is complete, restart the IDE to ensure the changes take effect.

![plugin_restart](./images/plugIn_restart_1.png)

If you want to explore the different releases of Cloud Code then you can check out in [JetBrains Marketplace](https://plugins.jetbrains.com/), and search for “Cloud Code”

![jetbrains_plugin1](./images/jb_plugin1.png)

For our tutorial, we will be using **23.5.1-222** version.

![jetbrains_plugin2](./images/jb_plugin2.png)

To stay updated on the latest releases and updates made to Cloud Code, you can visit the following link: [https://github.com/GoogleCloudPlatform/cloud-code-intellij/releases](https://github.com/GoogleCloudPlatform/cloud-code-intellij/releases).

![jetbrains_plugin3](./images/jb_plugin3.png)
