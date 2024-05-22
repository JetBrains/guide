---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-05-20
title: Dependency Injection in Go - Part 2
topics:
  - go
author: iu
subtitle: ""
thumbnail: ./thumbnail.png
tutorialItems:
  - ./prerequisites/
  - ./getting_started/
  - ./inject_wire/
  - ./inject_fx/
  - ./conclusion/
---

In dependency injection (DI), an object’s required dependencies are supplied from external sources instead of generating them internally within the object. Simply put, it's a programming pattern where an object receives all other objects it needs to operate effectively.

The [previous part](../dependency_injection_part_one/) of this series introduced dependency injection, covering its definition, principles, advantages, and potential limitations. Additionally, it explored the implementation of dependency injection using the Dig framework.

This installment explores how to implement dependency injection using two additional frameworks: Wire and Fx. Building on your knowledge from the first part, you'll modify your existing example to showcase the implementation of dependency injection using these powerful frameworks.
