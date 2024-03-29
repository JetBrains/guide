---
type: TutorialStep
date: 2021-04-09
title: Creating a new Django Project in PyCharm
topics:
  - aws
  - django
  - python
author: mm
subtitle: Create a virtual environment and install Python dependencies.
thumbnail: thumbnail.png
video: "https://youtu.be/2w3OHXLWfL4"
obsoletes:
  - /pycharm/tutorials/django-aws/setup-django
---

Hello everyone, welcome to the Django tutorial series. In this tutorial step, we are going to set up Django and run our first PyCharm Project.

## Installing Dependencies

As you can see in the following image, we will be installing Python dependencies, which is required for our Django project.

![python_dependencies](steps/step1.png)

We will move forward installing the virtual environment after the system dependencies have been successfully installed.

![python_dependencies_2](steps/step2.png)

I am going to name the virtual environment as _DjangoEnv_ and _-p_ flag stands for path to the Python interpreter, as for now I will be using the default Python interpreter, so I will mention it as _python3_. Ubuntu 20.04 LTS comes pre-installed with Python 3.8.

I will open PyCharm and create my new project I am going to name it _SampleDemo_.

![python_dependencies_3](steps/step3.png)

Since I have already configured the environment, I will click on the _previously configured interpreter_ where I will be providing the path to the virtual environment which I created earlier. PyCharm provides multiple ways to set up the Python interpreter.

Everything looks good, I will click **Create**.

After the project has been successfully initialized, I then move forward and change the appearance of the IDE.

![pycharm_django_project_1](steps/step4.png)

I will click on **File | Settings**. Under Appearance & Behavior I will change the theme from _Darcula_ to _IntelliJ Light_.

![pycharm_django_project_2](steps/step5.png)

We are now ready to start our development server. I will click **Run | Run ‘SampleDemo’**

![pycharm_django_project_3](steps/step6.png)

The application is now running on _127.0.0.1_ on port _8000_.

![pycharm_django_project_4](steps/step7.png)

As you can see in the image below, the Django landing page has appeared, that means
our installation process is successful.

![pycharm_django_project_5](steps/step8.png)

In the upcoming tutorial step, I will show to connect Django to our Postgres RDS instance.
