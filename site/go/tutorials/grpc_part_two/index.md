---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-06-12
title: Building a gRPC API in Go - Part Two
topics:
  - go
author: ab
subtitle: ""
thumbnail: ./thumbnail.png
tutorialItems:
  - ./connect_db/
  - ./writing_grpc_server/
  - ./comments_table/
---

Welcome to the second part of the "gRPC with Go" series. In [part one](../grpc_part_one/), you created the Protobuf definitions for the task management app, generated Go code stubs from the Protobuf definitions, and created a reverse proxy for REST clients.

In this part, you'll start working on the server. You'll hook the server to a database and write the `CreateTask` and `GetTask` endpoints. The remaining streaming endpoints will be tackled in the next part.
