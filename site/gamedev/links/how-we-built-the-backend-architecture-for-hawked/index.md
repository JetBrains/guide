---
date: 2024-10-23
title: "How We Built the Backend Architecture for HAWKED"
topics:
  - gamedev
  - asp.net
  - rider
  - .net
author: maartenba
subtitle: Vyacheslav Morov
thumbnail: ./thumbnail.png
video: "https://www.youtube.com/watch?v=50LuKCMLd7Y"
linkURL: "https://www.youtube.com/watch?v=50LuKCMLd7Y"
---

In this talk, we’ll examine the process of building the backend for the HAWKED project, highlighting the tools we used, the challenges we faced, and the lessons we learned.

Building a game server requires managing a large number of complex real-time operations where minimizing latency is crucial. It demands constant adaptation, as well as the refinement of both the server's architecture and your approach to backend development. To ensure the backend's reliability and efficiency, it is essential to focus on scalability, fault tolerance, and observability.

During development, we utilized frameworks and microservices like .NET, Orleans, and ASP.NET, and we had to overcome several challenges, including the need to implement mandatory singleton services and the limitations of various technologies and platforms.
