---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-05-27
title: Building a gRPC API in Go - Part Three
topics:
  - go
author: ab
subtitle: ""
thumbnail: ./thumbnail.png
tutorialItems:
  - ./comments_table/
  - ./conclusion/
---

Congratulations on making it to the third part of the "gRPC with Go" series.

To recap everything you've done so far: in [part one](URL), you wrote the Protobuf definitions, generated Go code stubs, and wrote the reverse proxy for REST clients. In [part two](URL), you connected your app to a PostgreSQL database and wrote the non-streaming endpoints of the gRPC server.

In this penultimate part, you'll finish the server by writing the remaining streaming endpoints.
