---
date: 2024-09-27
title: Overcoming Broken Window Syndrome – Code Verification Techniques for .NET Developers
topics:
  - resharper
  - coverage
  - inspections
  - csharp
author: maartenba
subtitle: Gael Fraiteur
thumbnail: ./thumbnail.png
video: https://www.youtube.com/watch?v=if71P8R8n44
linkURL: https://www.youtube.com/watch?v=if71P8R8n44
---

When coding standards, architectural guidelines, and conventions are only available in non-executable forms like documentation and diagrams, code quality tends to deteriorate over time. This deterioration leads to increased complexity, lower quality, and the accumulation of technical debt. To counteract this decline in quality, it’s essential to actively validate your source code against design rules and architectural standards as part of your DevOps pipeline.

This talk will explore several techniques for enforcing coding standards in .NET development. We’ll see how to use Reflection and Roslyn for thorough code analysis and demonstrate the implementation of architecture unit tests. We’ll also highlight the use of Roslyn analyzers and tools like NDepend and Qodana to provide real-time feedback. Additionally, we’ll introduce Metalama, a powerful tool that offers a fresh perspective on architecture enforcement, combining simplicity with real-time validation.

### About the Presenter

**Gael Fraiteur**

Gael built his first commercial software at age 12 and has never stopped coding ever since. With an academic background rooted in engineering and mathematics, Gael is widely recognized for his pioneering work in aspect-oriented programming (AOP), particularly through his creation of the PostSharp framework. Recently, his restless passion for improving software development led to the inception of Metalama, a totally new approach to code generation and architecture validation inspired by AOP and based on Roslyn.

Gael is a devoted father of five. His musical taste oscillates between baroque, Piazzolla, and classic rock. He is a mediocre piano player and a reasonably reckless driver. He regularly speaks at developer conferences and user groups.

- [Blog](https://blog.postsharp.net/)
