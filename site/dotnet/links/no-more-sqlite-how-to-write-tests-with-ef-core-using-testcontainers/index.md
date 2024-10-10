---
date: 2024-09-27
title: No More SQLite – How to Write Tests With EF Core Using Testcontainers
topics:
  - .net
  - docker
  - testing
  - rider
  - databases
author: maartenba
subtitle: Daniel Ward
thumbnail: ./thumbnail.png
video: https://www.youtube.com/watch?v=pvhA20OiFH8
linkURL: https://www.youtube.com/watch?v=pvhA20OiFH8
---

Integration tests are crucial to ensuring your app's reliability. However, traditional options for writing these with EF Core, such as using SQLite or a real dev database, often introduce challenges both in terms of maintainability and confidence – sometimes even secretly making tests pass with false positives.

This session will offer an alternative, a library called Testcontainers, that addresses these challenges. After going through the more common options and their pitfalls, I'll introduce the Testcontainers library, the benefits it offers, and demonstrate with a coding demo how to implement it in some real integration tests using EF Core.

While this talk will be made with .NET in mind and use examples in C#, the Testcontainers library is offered in 10+ languages, and the knowledge can be transferred to other ecosystems. Attendees will be assumed to have basic knowledge of unit and integration testing.

### About the Presenter

**Daniel Ward**

Daniel is a software consultant at Lean TECHniques who helps teams deliver high-quality software. He works with teams to adopt various agile and lean practices, such as effective CI/CD, automated testing, and product management. With experience in developing software and consulting teams across several industries, including financial, retail, and agriculture, he has fulfilled roles such as technical coach, agile coach, and tech lead, with a primary background as a software developer. He finds fulfillment in his work by working with others to understand their individual problems and working together to improve their products and professional enjoyment. The .NET ecosystem is where he is most comfortable and finds the most enjoyment.

In his free time, he also enjoys playing piano, swing dancing, and pursuing his own personal programming projects, including game development, for which he has a company called Nightcap Games that has already released one game commercially.

- [Twitter](https://twitter.com/danielwarddev)
- [Personal website](https://daninacan.com/)
