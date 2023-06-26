---
type: TutorialStep
date: 2023-03-30
title: Run Python Using a Run Configuration
topics: []
author: hs
subtitle: How to run you code in PyCharm.
thumbnail: thumbnail.png
videoBottom: true
longVideo:
  poster: poster_long.png
  url: 'https://youtu.be/FOdQa364sLM'
---

In the previous step, we saw how PyCharm makes coding productive.

In this step, we are going to talk about Run Configurations and how PyCharm helps you to run your Python code.

## Temporary Run Configurations
First off, let’s talk about temporary Run Configurations. If you haven't run your pure Python script yet, PyCharm will give you a drop-down that says **Add Configuration**. This means that PyCharm doesn’t know how to run this script yet.

To run your script, you can right-click anywhere inside the editor and click **Run script name**. PyCharm will create a Run Configuration, run the script, and display the output inside the Run tool window. The Run tool window is useful to see your output, as well as more comprehensive error messages if the Python interpreter finds an error in your program.

The temporary Run Configuration created by PyCharm is now available in the top bar and can now be reused every time you want to run this script again with the **Play** button.

<img src="run-configuration.png" alt="Run Configuration" width="700"/>

Alternatively If you scroll down, you can see that we have an `if __name__ == '__main__'` block, and it has a *play* icon in the gutter. This is another shortcut to create a temporary Run Configuration. When you click it, a context menu shows up, and the first option says **Run &lt; name of your script &gt;**.

<img src="main-block-run.png" alt="keymap" width="400"/>

Using the **Play** button will also create a temporary Run Configuration as well as displaying the output inside the Run tool window.

## Configurations From Project Templates
Let’s look at explicitly creating a Run Configuration. The previous scenario applies for both PyCharm Community and PyCharm Professional, but this option is only available for PyCharm Professional.

In an empty Django project, you can see that the Run Configurations button already shows the project name and a *Django* logo. This is because PyCharm professional has already created a basic Run Configuration, special for Django.

<img src="django-run-configuration.png" alt="Django Run Configuration" width="400"/>

When you click the **play** button, PyCharm launches the Django project, including a web server, so you can click the link in the Run tool window and see your Django project.

<img src="django-project-run-tool-window.png" alt="Django Run Tool Window" width="500"/>

PyCharm Professional also creates configurations for your Flask projects, FastAPI projects, and projects based on other frameworks.

## Permanent Run Configurations
Many times in your development workflow you will need to configure different startup points for your application, including, for example, executing your script with different Python interpreters. This is when your permanent Run Configurations come in handy.

The easiest way to do it is by transforming a temporary Run Configuration into a permanent one by clicking the drop-down menu and selecting **Save project name Configuration**.

<img src="save-main-configuration.png" alt="Save project configuration" width="400"/>

You can also use pre-configured templates to create your Run Configurations by opening the **Edit configurations** dialog and clicking on the **plus** button. You can then choose the target you are creating Run Configurations for. You can then choose the Run Configuration targets.

<img src="edit-configurations.png" alt="Editing Run Configurations" width="700"/>

## Conclusion
We saw how to quickly run our Python scripts with temporary Run Configurations, and why sometimes it is handy to create permanent ones.

In the next step, we’ll talk about basic code refactoring in PyCharm.

## Video
You can also check out the video for this step from our Getting Started series on YouTube:
