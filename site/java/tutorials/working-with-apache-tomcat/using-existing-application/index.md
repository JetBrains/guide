---
type: TutorialStep
date: 2024-11-11
title: Using Apache Tomcat with an existing application
topics: []
author: hs
subtitle: How to add Apache Tomcat to your application.
thumbnail: ./thumbnail.png
---

If you’re not creating a new project from scratch and instead have an existing project that runs on Tomcat, you can configure IntelliJ IDEA Ultimate to connect to your existing Tomcat installation. Let's work with [this application](https://github.com/helenjoscott/MyWebApp) from GitHub:

1. Clone the Project in IntelliJ IDEA and follow the instructions in `README.md` to run the project.
2. then go to **Run | Edit Configurations**.
3. Select **Add new run configuration** and then **Tomcat Server | Local** (because we are running our Apache Tomcat server on our machine) from the drop-down:

![Adding Apache Tomcat to Project](new_tomcat.png)

4. Give the configuration a name such as `tomcat` and then click **Configure** next to the Application Server drop-down.
5. Paste in the same path we used earlier to point to the location of Apache Tomcat on your machine and press **OK**.
6. Leave the remaining values as the default and click the **Deployment** tab at the top.
7. Click the **+** to add a new deployment artifact and select `Artifact`.
8. Select `MyWebApp:war exploded` because that will allow you to update the application code without redeploying or restarting the server and Press **OK**.

![Adding an artifact to deployment](deploy-artifact.png)

9. Click **OK** to finish configuring the Run configuration.

You can run the application with **^R** (macOS), or **Shift+F10** (Windows/Linux) and IntelliJ IDEA will open our browser at the application’s root context which in this case displays an actual page because this app has an `index.jsp` file.
