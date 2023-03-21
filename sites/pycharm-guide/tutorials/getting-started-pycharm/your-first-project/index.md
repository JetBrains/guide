---
type: TutorialStep
date: 2023-03-30
title: Your First Project
technologies: []
topics: []
author: hs
subtitle: New to PyCharm? Start here!
thumbnail: thumbnail.png
videoBottom: true
longVideo:
  poster: poster_long.png
  url: https://youtu.be/W5p8v4yhxjk
---

In the previous step, we stopped on the Welcome screen’s Projects tab.

But...what’s a project and how does it help you? What kinds of projects does PyCharm support? How do you start working with projects that might need a virtual environment?

## Why "Projects"?

Let's say you need to make a *project*. This is a major difference between an IDE like PyCharm and text editors.

PyCharm is great at analyzing all of your code in a project and then making you really productive at moving around, editing, bulk refactoring, warnings about problems and more.

But your coding isn’t just editing files. You have development workflows too; running code, debugging code, Python console, system terminal, tests, coverage, profiling, version control, databases, frontends... etc. The  project is your central view of all of this for your code, in a consistent, quality, familiar UI.

## Starting a Project
Now, back to where we left off on the Welcome screen and the “Projects” tab. If you’ve already worked on a project, the welcome screen will look a bit different. It will have a list of your recent projects in the center but the options will stay the same.

There are three available options on this screen.

<img src="welcome.png" alt="Welcome screen" width="500"/>

First, you can get an existing project from version control like GitHub, for example. You could then paste a repository URL in and click **Clone**.

Secondly, you can open a project stored on your machine by navigating to your local drive and finding a project you want to work on. Then, select it and click **Open**.

Finally, you can create a new project which is what we will do in this tutorial. 

Now that we decided to create a new project, you can see the first difference between PyCharm Community and PyCharm Professional. If you are using PyCharm Professional you can take advantage of project types. Project types are pre-configured environments that automate the project creation by setting technology-specific preferences, downloading dependencies, creating required files, etc.

PyCharm Community is for pure Python only, you won’t see these options on the left side. In PyCharm Professional, on the other hand, there are several technologies that you can choose from. You can also select ‘Pure Python’ if all you want to do is work on a pure Python project, which is what you get in PyCharm Community Edition.

If your work requires a Python web framework, or scientific tools, or maybe front-end technologies, you have some options. For example, if you are working with a Python Web project, PyCharm supports popular frameworks such as Django and Flask out of the box. If you're working with data science you can use the scientific tooling setup. It will create both a Conda environment and the folder structure for you. Finally, if you want to work on the front-end, PyCharm Professional also has professional support for working with JavaScript, TypeScript, and its related technologies, including Angular and React.

In this tutorial, we are going to start working on a Django project which we will call *getting_started*. We now need to take a detour and cover virtual environments.

## Interpreters
In Python projects, it’s a best practice to do your work by creating a *virtual environment*. Each project then acts like it has its own Python. If you install some packages in one project, it won’t break another project.

PyCharm takes care of this part by creating and activating a virtual environment for your new project. Back to our New Project screen, we have a section called **Python Interpreter: New Virtualenv environment**. In our case, we are going to create a new one using *virtualenv*, but as you can see here PyCharm also supports *PipEnv* and *Conda* out of the box.

We already have Python 3.10 installed as my default Python. PyCharm detected it, so we can click **Create**.

<img src="starting-project.png" alt="Starting a project" width="500"/>

PyCharm will now create a new Django project for you as well as creating and activating a virtual environment, downloading all the required dependencies, generating an empty Django project with configuration files, creating run and debug configurations, and more.

If you close this project, you go back to the PyCharm Welcome screen where you can see that the *Projects tab* has changed slightly. Now you see your recent projects, and this list will grow as you have more projects.

## Conclusion
In this step we learned about projects, and how to start a new project in PyCharm. 

In the next step, we are going to dive into PyCharm’s UI so you’ll feel more comfortable starting your code journey right away.

## Video
You can also check out the video for this step from our Getting Started series on YouTube: