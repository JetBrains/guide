---
type: TutorialStep
date: 2024-05-16
title: "What Is Dependency Injection?"
topics:
  - go
author: israel
subtitle: ""
thumbnail: ./thumbnail.png
---

DI is a recommended design pattern and a software development technique used to implement the inversion of control principle in software applications. IoC is the transfer of control of objects, object dependencies, and general application flow to a different component or part of the application.

While IoC and DI are sometimes used interchangeably, it's important to note that they are not identical concepts. Dependency injection is a specific technique for achieving IoC, but IoC encompasses broader techniques and patterns.

In DI, the dependencies of an object (_ie_ the objects it relies on) are provided externally rather than created internally by the object itself. As an example, suppose Service X requires a function from Service Y to perform its operations effectively. Instead of Service X internally creating a new instance of Service Y, the recommended approach with DI is to have a separate component responsible for creating an instance of Service Y and then "inject" that instance into Service X.

The following sections highlight the methods you can use to achieve DI.
