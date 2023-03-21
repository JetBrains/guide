---
resourceType: tutorial
layout: "resources/tutorial/TutorialLayout.11ty.tsx"
date: 2023-03-30
title: Getting Started with PyCharm
technologies: []
topics: []
author: hs
subtitle: Everything you need to know to get started developing applications in PyCharm.
thumbnail: ./thumbnail.png
tutorialItems:
  - ./installation-and-setup/
  - ./your-first-project/
  - ./understanding-the-ui/
  - ./customizing-the-ui/
  - ./configuring-local-python-interpreter/
  - ./configuring-remote-python-interpreter/
  - ./installing-and-managing-python-packages/
  - ./basic-code-assistance/
  - ./run-python-using-a-run-configuration/
  - ./basic-code-refactoring/
  - ./basic-code-debugging/

---

This tutorial will take you through installing and setting up PyCharm, customising the user interface, configuring your Python interpreters, managing your Python packages, getting assistance writing your code, and then running, refactoring and debugging your code.

## Sample code
This is the code that will be using in this tutorial:
```
class Car:

    def __init__(self, speed=0):
        self.speed = speed
        self.odometer = 0
        self.time = 0

    def say_state(self):
        print("I'm going {} kph!".format(self.speed))

    def accelerate(self):
        self.speed += 5

    def brake(self):
        if self.speed < 5:
            self.speed = 0
        else:
            self.speed -= 5

    def step(self):
        self.odometer += self.speed
        self.time += 1

    def average_speed(self):
        if self.time != 0:
            if self.time != 0:
                return self.odometer / self.time
            else:
                pass

```