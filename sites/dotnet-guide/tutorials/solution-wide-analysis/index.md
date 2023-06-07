---
resourceType: tutorial
layout: "resources/tutorial/TutorialLayout.11ty.tsx"
date: 2023-06-20
title: Solution-Wide Analysis
technologies: [.net, csharp, fsharp]
topics: [inspections, editing]
products: [rider, resharper]
author: maartenba
subtitle: Find and resolve code issues in your projects.
thumbnail: ./thumbnail.png
tutorialItems:
  - ./what-is-solution-wide-analysis/
  - ./exploring-code-analysis-results/  
  - ./fixing-warnings-errors/  
---

Most of the code inspections in ReSharper and Rider only need the source code of a single file to detect code issues. In addition to these inspections, there are several solution-wide inspections for code issues which can only be detected in the scope of the entire solution, for example, to detect whether a method parameter is unused, or when classes can be made sealed based on there being no derived classes.

The analysis results will help you spot both compilation errors and runtime errors, even before running your application!

In this tutorial, we’ll have a look at Solution-Wide Analysis (SWEA).