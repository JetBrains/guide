---
type: TutorialStep
date: 2024-06-07
title: "Running Docker through PyCharm"
topics:
  - docker
  - django
author: mm
subtitle: Build and run a Docker container from your IDE.
thumbnail: thumbnail.png
---

Let’s start running the Docker application through PyCharm.

Open the `Dockerfile` and click on the _Run_ icon → `New Run Configuration`

![step1](./images/9.png)

![step2](./images/10.png)

Under **Modify options**, click **Enable BuildKit**. According to the official [documentation](https://docs.docker.com/build/buildkit/), BuildKit serves as an upgraded backend designed to supersede the traditional builder. As the default builder in Docker Desktop and Docker Engine starting from version 23.0, BuildKit introduces new features and enhances the performance of your builds.

![step2](./images/11.png)

![step3](./images/12.png)

![step4](./images/13.png)

Next, we should set up port binding. This function enables Docker to map a port on your machine to a corresponding port inside the container.

![step5](./images/14.png)

![step6](./images/15.png)

We will bind the container port and host port to 8000.

Once you are done with the configuration, go ahead and apply the changes and click **Run**.

![step7](./images/16.png)

It will take a few seconds to start the application.

![step8](./images/17.png)

Once the application is up and running, you can easily manage it through PyCharm.

![step9](./images/18.png)

Let’s check in the browser, by visiting [localhost:8000](http://localhost:8000)

Woo Hoo! The app is running.

![step10](./images/19.png)

You can now easily view live logs inside the container.

![step11](./images/20.png)

The same goes for the `compose.yaml`.

![step12](./images/21.png)
